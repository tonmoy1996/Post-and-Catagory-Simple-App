import React, { Component } from 'react';
import axios from 'axios';
import InputGroup from './common/InputGroup';
import TextareaGroup from './common/TextareaGroup';
// import SelectGroup from './common/SelectGroup';
import SelectInput from './common/SelectInput';
import { Modal, Button } from 'react-bootstrap';
class PostComponent extends Component {
  state = {
    posts: [],
    title: '',
    body: '',
    show: false,
    options: [],
    currentId: '',
    name: '',
    catModal: false,
    defaultValue: {},
    selected: [],
    catagoryList: [],
  };
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3001/catagory');
    this.setState({ options: data });
    const { data: posts } = await axios.get('http://localhost:3001/post');

    this.setState({ posts });
  }
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  editAction = (post) => {
    this.setState({
      title: post.title,
      body: post.body,
      show: true,
      currentId: post._id,
      catagoryList: post.catagory,
    });
  };
  onChange = (e) => {
    if (e.target.value === 'new') {
      this.setState({
        catModal: true,
        show: false,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSelectChange = (e) => {
    if (Array.isArray(e)) {
      e.map((value) => {
        if (value.label === 'New Catagory') {
          this.setState({
            catModal: true,
            show: false,
          });
        }
        return null;
      });
    }
    this.setState({
      selected: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body, selected } = this.state;
    let list = selected.filter((item) => item !== 'name');
    const data = {
      title: title,
      body: body,
      catagory: list,
    };
    let filtered = this.state.posts.filter((post) => {
      return post._id !== this.state.currentId;
    });

    try {
      const post = await axios.put(
        `http://localhost:3001/post/${this.state.currentId}`,
        data
      );

      this.setState({
        posts: [...filtered, post.data],
        title: '',
        body: '',
        selected: [],
        show: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleDelete = async (e) => {
    let filtered = this.state.posts.filter((post) => {
      return post._id !== e._id;
    });
    this.setState({
      posts: filtered,
    });
    await axios.delete(`http://localhost:3001/post/${e._id}`);
  };
  handleCatClose = () => {
    this.setState({
      catModal: false,
      show: true,
    });
  };
  handleCatagorySubmit = async (e) => {
    e.preventDefault();
    let formdata = {
      name: this.state.name,
    };
    const result = await axios.post('http://localhost:3001/catagory', formdata);
    this.setState({
      options: [...this.state.options, result.data],
      catModal: false,
    });
  };

  render() {
    const newOptions = this.state.options.map((data) => ({
      label: data.name,
      value: data.name,
    }));
    newOptions.unshift({ label: 'New Catagory', value: 'new' });
    return (
      <div className='container'>
        <div className='row'>
          {this.state.posts.map((post) => (
            <div className='col-md-4' key={post._id}>
              <div className='card mt-5'>
                <div className='card-body'>
                  <h5 className='card-title'>{post.title}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    {Object.keys(post.catagory).map((key) => {
                      return (
                        <a
                          href='!#'
                          key={key}
                          className='badge badge-secondary ml-2'
                        >
                          {post.catagory[key]}
                        </a>
                      );
                    })}
                  </h6>
                  <p className='card-text'>{post.body}.</p>
                  <button
                    onClick={() => this.editAction(post)}
                    className='btn btn-primary'
                  >
                    <i className='fa fa-edit'></i>
                  </button>
                  <button
                    onClick={() => this.handleDelete(post)}
                    className='btn btn-danger ml-3'
                  >
                    <i className='fa fa-remove'></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='row'>
          <div className='col-md-10'>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={this.handleSubmit}>
                  <InputGroup
                    name='title'
                    placeholder='Title'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  <TextareaGroup
                    name='body'
                    placeholder='body'
                    value={this.state.body}
                    onChange={this.onChange}
                  />
                  {/* <SelectGroup
                    name='catId'
                    value={this.state.catId}
                    onChange={this.onChange}
                    options={this.state.options}
                    
                  /> */}
                  {Object.keys(this.state.catagoryList).map((key) => {
                    return (
                      <a
                        href='!#'
                        key={key}
                        className='badge badge-info ml-2 my-2'
                      >
                        {this.state.catagoryList[key]}
                      </a>
                    );
                  })}
                  <SelectInput
                    options={newOptions}
                    onSelectChange={this.onSelectChange}
                  />
                  <button className='btn btn-primary mt-4'>Add</button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={this.handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        {/* Catagory create  */}
        <div className='row'>
          <div className='col-md-10'>
            <Modal show={this.state.catModal} onHide={this.handleCatClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={this.handleCatagorySubmit}>
                  <InputGroup
                    name='name'
                    placeholder='Catagory'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <button className='btn btn-primary mt-4'>Add</button>
                </form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default PostComponent;
