const { expect } = chai;
describe("BlockGrid", function() {
  "use strict";
  const blockGrid = new BlockGrid();

  describe("clearBlock", () => {
    it('should turn the block white and make it not clickable');
    it('should be idempotent');
  });

  describe('removeBlock', () => {
    it('is idempotent');
    it('makes the block not clickbale');
    it('turns the block white');
  });

  describe('getNeighbours', () =>{
    it('returns the neighrbours to either side and above');
    it('returns correct results for corner blocks');
    it('returns correct results for blocks on the edges');
  });

  describe('reorderColumn', () => {
    /* Why would we need this function? Can you fill the test in and use it? */
    it('should ensure that remaining blocks are at the bottom');
  });
});
