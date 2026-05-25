function reviewPR(code) {
  const comments = [];

  if (code.includes('TODO')) {
    comments.push(
      'Found TODO comment. Please resolve before merging.'
    );
  }

  if (code.includes('console.log')) {
    comments.push(
      'Remove console.log statements before merging.'
    );
  }

  return {
    approved: comments.length === 0,
    comments,
  };
}

module.exports = { reviewPR };