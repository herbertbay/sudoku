export const examples = [
    [ "Medium 1",
      0, 0, 0,  0, 0, 0,  0, 0, 6,
      0, 3, 0,  0, 7, 1,  0, 4, 0,
      0, 0, 0,  0, 0, 0,  8, 0, 0,

      0, 0, 0,  9, 0, 8,  0, 7, 1,
      1, 0, 3,  0, 0, 0,  0, 0, 0,
      0, 0, 2,  0, 3, 0,  9, 0, 0,

      5, 0, 7,  0, 0, 6,  0, 0, 0,
      2, 0, 0,  0, 0, 0,  7, 0, 0,
      0, 0, 1,  8, 0, 0,  0, 0, 2,
    ],
    [ "Medium 2",
      0, 0, 0,  0, 1, 7,  2, 0, 0,
      0, 0, 0,  4, 0, 0,  0, 0, 0,
      0, 0, 9,  0, 0, 3,  0, 0, 0,

      4, 0, 0,  7, 8, 0,  5, 0, 0,
      0, 2, 5,  0, 0, 0,  8, 0, 0,
      0, 0, 0,  6, 0, 0,  0, 0, 0,

      6, 0, 1,  5, 0, 0,  0, 0, 0,
      0, 0, 0,  0, 0, 6,  0, 3, 0,
      2, 0, 0,  0, 0, 1,  7, 0, 4,
    ],
    [ "Medium 3",
      9, 0, 0,  5, 0, 1,  7, 0, 0,
      2, 0, 1,  0, 0, 9,  0, 0, 0,
      0, 0, 0,  8, 7, 0,  0, 9, 0,

      0, 8, 0,  0, 6, 4,  0, 7, 0,
      0, 0, 0,  0, 0, 0,  2, 1, 0,
      0, 0, 0,  0, 9, 0,  0, 0, 0,

      7, 0, 6,  2, 4, 0,  0, 0, 0,
      0, 4, 0,  0, 0, 0,  0, 0, 6,
      1, 0, 0,  0, 0, 0,  0, 4, 0,
    ],
    [ "Medium 4",
      0, 0, 0,  0, 3, 0,  5, 7, 0,
      0, 0, 2,  0, 0, 8,  0, 0, 0,
      6, 0, 0,  0, 0, 0,  0, 0, 0,

      0, 3, 0,  5, 7, 0,  0, 4, 0,
      0, 0, 0,  4, 0, 0,  0, 0, 2,
      0, 0, 5,  6, 0, 0,  7, 1, 8,

      0, 7, 8,  0, 0, 0,  0, 0, 0,
      0, 0, 6,  7, 0, 9,  0, 0, 1,
      0, 0, 0,  0, 0, 0,  0, 2, 0,
    ],
    [ "Hard",
      8, 0, 0,  0, 0, 0,  0, 0, 0,
      0, 0, 3,  6, 0, 0,  0, 0, 0,
      0, 7, 0,  0, 9, 0,  2, 0, 0,

      0, 5, 0,  0, 0, 7,  0, 0, 0,
      0, 0, 0,  0, 4, 5,  7, 0, 0,
      0, 0, 0,  1, 0, 0,  0, 3, 0,

      0, 0, 1,  0, 0, 0,  0, 6, 8,
      0, 0, 8,  5, 0, 0,  0, 1, 0,
      0, 9, 0,  0, 0, 0,  4, 0, 0,
    ],
    [ "Really Hard™",
      0, 0, 0,  8, 0, 1,  0, 0, 0,
      0, 0, 0,  0, 0, 0,  0, 4, 3,
      5, 0, 0,  0, 0, 0,  0, 0, 0,

      0, 0, 0,  0, 7, 0,  8, 0, 0,
      0, 0, 0,  0, 0, 0,  1, 0, 0,
      0, 2, 0,  0, 3, 0,  0, 0, 0,

      6, 0, 0,  0, 0, 0,  0, 7, 5,
      0, 0, 3,  4, 0, 0,  0, 0, 0,
      0, 0, 0,  2, 0, 0,  6, 0, 0,
    ],
];

function i2rc(index) {
    return { row: Math.floor(index / 9), col: index % 9 };
}

function rc2i(row, col) {
    return row * 9 + col;
}

function unique(board, index, value) {
    let { row, col } = i2rc(index);
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            let i = rc2i(r, c);
            if (i != index && !board[i] && acceptable(board, i, value)) {
                return false;
            }
        }
    }
    return true;
}

function acceptable(board, index, value) {
    let { row, col } = i2rc(index);

    // if already present on the column, not acceptable
    for (let r = 0; r < 9; ++r)
        if (board[rc2i(r, col)] == value) return false;

    // if already present on the row, not acceptable
    for (let c = 0; c < 9; ++c)
        if (board[rc2i(row, c)] == value) return false;

    // unique by diagonal
    // if (row == col)
    //     for (let r = 0, c = 0; r < 9; ++r, ++c)
    //         if (board[rc2i(r, c)] == value) return false;
    // if (8 - row == col)
    //     for (let r = 0, c = 8; r < 9; ++r, --c)
    //         if (board[rc2i(r, c)] == value) return false;

    // if already present in the same 3x3 square, also not acceptable
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            if (board[rc2i(r, c)] == value) return false;
        }
    }

    // we have a "go"
    return true;
}

function log(el, txt) {
    let out = el.querySelector(".js-console");
    if (out)
        out.textContent = txt;
}

export class Sudoku {
    constructor(container, { controls = true, smartOrdering = false, smartChoices = false } = {}) {
        this.container = container;
        this.getChoices = smartChoices ? this.getChoices2 : this.getChoices1;
        this.init(controls);

        if (controls) {
            container.querySelector(".js-examples-select").addEventListener("change", ev => {
                this.writeBoard(ev.target.value.split(",").map(parseFloat), true);
            });
            container.querySelector(".js-examples-select").addEventListener("click", ev => {
                this.writeBoard(ev.target.value.split(",").map(parseFloat), true);
            });
            container.querySelector(".js-solve").addEventListener("click", ev =>
                smartOrdering ? this.solve() : this.solveDumb());
            container.querySelector(".js-play").addEventListener("click", ev =>
                smartOrdering ? this.stepSolve() : this.stepSolveDumb());
            container.querySelector(".js-pause").addEventListener("click", ev => this.pause());
            container.querySelector(".js-continue").addEventListener("click", ev => this.continue());
            container.querySelector(".js-reset").addEventListener("click", ev => this.reset());
            container.querySelector(".js-clear").addEventListener("click", ev => this.clearBoard());
        }
    }

    init(controls = true) {
        let container = this.container;
        let html = `\
  <div class="sudoku">
    <div class="sudoku-board">
      ${[...Array(81).keys()].map(i => {
        let { row, col } = i2rc(i);
        return `<input class="js-field" maxlength="1" type="text" data-index="${i}" data-row="${row}" data-col="${col}" />`;
      }).join("")}
    </div>
    <div class="controls">
    ${!controls ? '' : `
        <select class="js-examples-select">
          <option selected disabled hidden>Examples</option>
          ${ examples.map(example => `
              <option value="${example.slice(1).join(",")}">${example[0]}</option>
            `).join("")}
        </select>
        <button class="js-solve">Solve!</button>
        <button class="js-play">Play</button>
        <button class="js-pause">Pause</button>
        <button class="js-continue">Continue</button>
        <button class="js-reset">Reset</button>
        <button class="js-clear">Clear</button>`}
      <div class="stats js-console"></div>
    </div>
  </div>`;
        container.innerHTML = html;
        let fields = container.querySelectorAll("input.js-field");
        fields.forEach(input => {
            input.addEventListener("input", ev => {
                let input = ev.target;
                input.classList.toggle("init", input.value);
            });
            input.addEventListener("click", ev => {
                input.focus();
                input.select();
            });
            input.addEventListener("focus", ev => {
                let index = parseInt(input.dataset.index, 10);
                log(container, `Allowed digits:
  ${this.getChoices(this.readBoard(), index).join(", ")}`);
            });
        });
    }

    pause() {
        clearTimeout(this._playTimer);
        this.container.classList.add("paused");
    }

    continue() {
        this.container.classList.remove("paused");
        this._playCont();
    }

    readBoard() {
        return [...this.container.querySelectorAll("input.js-field")]
            .map(el => el.value ? parseInt(el.value, 10) : 0);
    }

    writeBoard(values, init = false) {
        let el = this.container;
        [...el.querySelectorAll("input.js-field")].forEach((el, i) => {
            el.value = values[i] || "";
            if (init) {
                el.classList.toggle("init", values[i]);
            }
        });
        if (init) {
            this._initBoard = values;
            this._reset();
        }
    }

    clearBoard() {
        let el = this.container;
        [...el.querySelectorAll("input.js-field")].forEach(el => {
            el.value = "";
            el.classList.remove("init");
        });
        this._reset();
    }

    reset() {
        this.writeBoard(this._initBoard || [], true);
    }

    _reset() {
        let el = this.container;
        clearTimeout(this._playTimer);
        el.classList.remove("solved", "playing", "paused");
        log(el, "");
    }

    getChoices1(board, index) {
        let choices = [];
        for (let value = 1; value <= 9; ++value) {
            if (acceptable(board, index, value)) {
                choices.push(value);
            }
        }
        return choices;
    }

    getChoices2(board, index) {
        let choices = [];
        for (let value = 1; value <= 9; ++value) {
            if (acceptable(board, index, value)) {
                if (unique(board, index, value))
                    return [ value ];
                else
                    choices.push(value);
            }
        }
        return choices;
    }

    bestBet(board) {
        let index, moves, bestLen = 100;
        for (let i = 0; i < board.length; ++i) {
            if (!board[i]) {
                let m = this.getChoices(board, i);
                if (m.length < bestLen) {
                    bestLen = m.length;
                    moves = m;
                    index = i;
                    if (bestLen == 0) break;
                }
            }
        }
        return { index, moves };
    }

    solve() {
        let self = this;
        let el = self.container;
        let board = self.readBoard();
        let backtrack = 0;
        let time = Date.now();
        if (solve()) {
            self.writeBoard(board);
            el.classList.add("solved");
        } else {
            alert("no solution");
        }
        log(el, backtrack + " take-backs, " + (Date.now() - time) + " ms");
        function solve() {
            let { index, moves } = self.bestBet(board);
            if (index == null) return true;
            for (let m of moves) {
                board[index] = m;
                if (solve()) return true;
            }
            board[index] = 0;
            ++backtrack;
            return false;
        }
    }

    stepSolve() {
        let self = this;
        let el = self.container;
        el.classList.add("playing");
        let board = self.readBoard();
        let backtrack = 0;
        solve(success => {
            log(el, backtrack + " take-backs");
            el.classList.remove("playing");
            if (success) {
                self.writeBoard(board);
                el.classList.add("solved");
            } else {
                alert("no solution");
            }
        });
        function solve(cb) {
            let { index, moves } = self.bestBet(board);
            if (index == null) return cb(true);
            else (function loop(m){
                if (m < moves.length) {
                    board[index] = moves[m];
                    self.writeBoard(board);
                    self._playTimer = setTimeout(self._playCont = () =>
                        solve(success => success ? cb(true) : loop(m + 1)), 100);
                } else {
                    board[index] = 0;
                    ++backtrack;
                    log(el, backtrack + " take-backs");
                    cb(false);
                }
            })(0);
        }
    }

    solveDumb() {
        let self = this;
        let el = self.container;
        let board = self.readBoard();
        let backtrack = 0;
        let time = Date.now();
        if (solve(0)) {
            self.writeBoard(board);
            el.classList.add("solved");
        } else {
            alert("no solution");
        }
        log(el, backtrack + " take-backs, " + (Date.now() - time) + " ms");
        function solve(index) {
            while (index < board.length && board[index]) ++index;
            if (index >= board.length) return true;
            let moves = self.getChoices(board, index);
            if (moves.length == 0) return false;
            for (let m of moves) {
                board[index] = m;
                if (solve(index + 1)) return true;
            }
            board[index] = 0;
            ++backtrack;
            return false;
        }
    }

    stepSolveDumb() {
        let self = this;
        let el = self.container;
        el.classList.add("playing");
        let board = self.readBoard();
        let backtrack = 0;
        solve(0, success => {
            log(el, backtrack + " take-backs");
            el.classList.remove("playing");
            if (success) {
                self.writeBoard(board);
                el.classList.add("solved");
            } else {
                alert("no solution");
            }
        });
        function solve(index, cb) {
            while (index < board.length && board[index]) ++index;
            if (index >= board.length) return cb(true);
            let moves = self.getChoices(board, index);
            if (moves.length == 0) return cb(false);
            else (function loop(m){
                if (m < moves.length) {
                    board[index] = moves[m];
                    self.writeBoard(board);
                    self._playTimer = setTimeout(self._playCont = () =>
                        solve(index + 1, success => success ? cb(true) : loop(m + 1)), 100);
                } else {
                    board[index] = 0;
                    ++backtrack;
                    log(el, backtrack + " take-backs");
                    cb(false);
                }
            })(0);
        }
    }
}