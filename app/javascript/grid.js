'use strict';

const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

class Block {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.clickable = true;
  }
}

class BlockGrid {
  constructor () {
    this.grid = [];

    for (let x = 0; x < MAX_X; x++) {
      const col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }

    return this;
  }

  redrawBlock(blockEl, block) {
    const {x, y, colour} = block;
    const id = `block_${x}x${y}`;

    blockEl.id = id;
    blockEl.className = 'block';
    blockEl.style.background = block.colour;
  }
  getNeighbours(block){
    /*
    how do you get all neighbours of a given block given its coordinates
    */
    getSameColourNeighbours(block);
  }

  getSameColourNeighbours(block){
    /*
    how do you get only same color blocks?
    */
    block.clickable = false;
    let neighbour = this.grid[block.x + 1] ? this.grid[block.x + 1][block.y] : undefined;
    if (neighbour && neighbour.clickable === true && neighbour.colour === block.colour) {
      this.getSameColourNeighbours(neighbour);
    }
    neighbour = this.grid[block.x - 1] ? this.grid[block.x - 1][block.y] : undefined;
    if (neighbour && neighbour.clickable === true && neighbour.colour === block.colour) {
      this.getSameColourNeighbours(neighbour);
    }
    neighbour = this.grid[block.x] ? this.grid[block.x][block.y + 1] : undefined;
    if (neighbour && neighbour.clickable === true && neighbour.colour === block.colour) {
      this.getSameColourNeighbours(neighbour);
    }
    neighbour = this.grid[block.x] ? this.grid[block.x][block.y - 1] : undefined;
    if (neighbour && neighbour.clickable === true && neighbour.colour === block.colour) {
      this.getSameColourNeighbours(neighbour);
    }
    block.colour = 'white';
  }

  findClickableAbove(block) {
    let x = block.x;
    for (let y = block.y + 1; y < MAX_Y; y++) {
      if (this.grid[x][y] && this.grid[x][y].clickable) {
        return {block: this.grid[x][y], x: x, y: y};
      }
    }
    return {block: block, x: block.x, y: block.y};
  }

  sortGrid() {
    for (let x = 0; x < MAX_X; x++) {
      for (let y = 0; y < MAX_Y; y++) {
        if (this.grid[x][y].clickable === false) {
          let toSwapWith = this.findClickableAbove(this.grid[x][y]);
          this.grid[toSwapWith.x][toSwapWith.y] = JSON.parse(JSON.stringify(this.grid[x][y]));
          this.grid[toSwapWith.x][toSwapWith.y].x = toSwapWith.x;
          this.grid[toSwapWith.x][toSwapWith.y].y = toSwapWith.y;
          this.grid[x][y] = JSON.parse(JSON.stringify(toSwapWith.block));
          this.grid[x][y].x = x;
          this.grid[x][y].y = y;
        }
      }
    }
  }

  render(grid=document.querySelector('#gridEl')) {
    let el = grid.cloneNode(false);
    grid.parentNode.replaceChild(el, grid);
    for (let x = 0; x < MAX_X; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const blockEl = document.createElement('div');

        if(block.clickable) {
          blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
        }

        colEl.appendChild(blockEl);
        this.redrawBlock(blockEl, block);
      }
    }

    return this;
  }

  blockClicked (e, block) {
    /*
    what happens on each block click before you re-render?
    what happens to each column of blocks?
    */
    this.getSameColourNeighbours(block);
    this.sortGrid();
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
