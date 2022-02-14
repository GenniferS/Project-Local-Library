function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((prev, current) => {
    return prev.name.last.toLowerCase() > current.name.last.toLowerCase()
      ? 1
      : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((borrows, book) => {
    book.borrows.forEach((borrow) => {
      borrow.id === account.id ? borrows++ : "";
    });
    return borrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = books.filter((book) => {
        let authorObj = authors.find((author) => author.id === book.authorId);
        book.author = authorObj;
        return book.borrows.find((item) => item.id === account.id && !item.returned);
  })
	return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
