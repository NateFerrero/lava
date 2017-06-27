const lava = require('../lava');

describe('lava (assignment)', () => {
  context('set x to 1', () => {
    subject(() => lava('x = 1'));

    it('returns a state where x is 1 and y is not defined', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(1);
    });

    it('returns a state where x is defined', () => {
      const state = subject.now();
      expect(state.defined('x')).to.be(true);
    });

    it('returns a state where y is not defined', () => {
      const state = subject.now();
      expect(() => state.get('y')).to.throw(/"y" is not defined/);
    });
  });

  context('set x to 2', () => {
    subject(() => lava('x = 2'));

    it('returns a state where x is 2', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(2);
    });
  });

  context('set x to different values', () => {
    subject(() => lava('x = 1 ; x = 2 ; x = 3'));

    it('returns a state where x is the last value set', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(3);
    });
  });

  context('set and unset x', () => {
    subject(() => lava('x = 1 ; ! x'));

    it('returns a state where x is not defined', () => {
      const state = subject.now();
      expect(state.defined('x')).to.be(false);
      expect(() => state.get('x')).to.throw(/"x" is not defined/);
    });
  });

  context('set, unset, and re-set x', () => {
    subject(() => lava('x = 1 ; ! x ; x = 7'));

    it('returns a state where x is defined', () => {
      const state = subject.now();
      expect(state.defined('x')).to.be(true);
    });

    it('returns a state where x is 7', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(7);
    });
  });

  context('store and rewind state', () => {
    subject(() => lava('x = 1 ; >> initial ; x = 2 ; x = 3 ; << initial'));

    it('returns a state where the value of x has been restored to 1', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(1);
    });

    it('returns a state where intial is not defined', () => {
      const state = subject.now();
      expect(state.defined('initial')).to.be(false);
    });
  });

  context('multiple keys assignment', () => {
    subject(() => lava('x = 1 ; y = 2 ; z = 3'));

    it('returns a state where x, y, and z all have values', () => {
      const state = subject.now();
      expect(state.get('x')).to.be(1);
      expect(state.get('y')).to.be(2);
      expect(state.get('z')).to.be(3);
    });
  });
});
