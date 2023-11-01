const API_URL = 'http://localhost:3001';
const BEATFILM_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const WIDTHS = {
    l: {
      width: 1280,
      cards: {
        onPage: 12,
        new: 3,
      },
    },

    m: {
      width: 1180,
      cards: {
        onPage: 8,
        new: 2,
      },
    },

    s: {
      width: 767,
      cards: {
        onPage: 5,
        new: 2,
      },
    },
};

export {
  API_URL,
  BEATFILM_URL,
  WIDTHS
};
