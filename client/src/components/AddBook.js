import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import { getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    // setup initial state
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }
  // function to get data from graphql
  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    // check if data is loading
    if (data.loading === true) {
      return <option disabled>Loading Authors...</option>;
    } else {
      // return data once loading is done
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  // handle submit form
  submitForm(event) {
    event.preventDefault();

    if (this.state.name === '' || this.state.genre === '' || this.state.authorId === '') {
      return;
    } else {
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        // re-render the page by refetching books
        refetchQueries: [{ query: getBooksQuery }]
      });
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={event => this.setState({ name: event.target.value })} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={event => this.setState({ genre: event.target.value })} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={event => this.setState({ authorId: event.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
