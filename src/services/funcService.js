module.exports = {
  getRandomColor: chart => {
    const h = Math.floor(Math.random() * 360),
      s = Math.floor(Math.random() * 60) + '%',
      light = '50%',
      dark = '30%';

    if (chart) {
      return `hsl(${h},${s},${light})`;
    }

    return { light: `hsl(${h},${s},${light})`, dark: `hsl(${h},${s},${dark})` };
  }
};
