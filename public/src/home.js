function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) {
      result++;
    }
  });

  return result;
}

function getMostCommonGenres(books) {
  let result = [];
  let allGenres = [];
  books.forEach(book => {
    let bookGenre = book.genre;
    if (!allGenres.includes(bookGenre)) {
      allGenres.push(bookGenre);
    }
  });
  allGenres.forEach(genre => {
    let allBooksInGenre = books.filter(book => {
      return book.genre === genre;
    });
    let resultItem = {};

    resultItem.name = genre;
    resultItem.count = allBooksInGenre.length;

    result.push(resultItem);
  });

  let orderedResult = sortResult(result);

  return orderedResult.slice(0, 5);
}

function getMostPopularBooks(books) {
  let bookCollection = books.reduce((results, previousBook) => {
    results.push({
      name: previousBook.title,
      count: previousBook.borrows.length
    });

    return results;
  }, []);

  let orderedResult = sortResult(bookCollection);

  return orderedResult.slice(0, 5);
}

function sortResult(result) {
  let orderedResult = result.sort((prev, current) => {
    if (prev.count > current.count) {
      return -1;
    }

    if (prev.count < current.count) {
      return 1;
    }

    return 0;
  });

  return orderedResult;
}

function getMostPopularAuthors(books, authors) {
  let authorList = authors.reduce((results, author) => {
    let totalBooksBorrowed = books.reduce((count, book) => {
      if (book.authorId === author.id) {
        count += book.borrows.length;
      }

      return count;
    }, 0);

    results.push({
      name: `${author.name.first} ${author.name.last}`,
      count: totalBooksBorrowed
    });

    return results;
  }, []);

  let orderedResult = sortResult(authorList);

  return orderedResult.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors
};
