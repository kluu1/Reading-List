import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// import components
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  // function to get data from graphql
  displayBooks() {
    const data = this.props.data;
    // check if data is loading
    if (data.loading === true) {
      return <div>Loading Books...</div>;
    } else {
      // return data once loading is done
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={event => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
