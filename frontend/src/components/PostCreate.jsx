import React, { Component } from 'react';
import InputGroup from './common/InputGroup';
import TextareaGroup from './common/TextareaGroup';
import axios from 'axios';
import Joi from 'joi-browser';
// import SelectGroup from './common/SelectGroup';
import SelectInput from './common/SelectInput';
import { Modal, Button } from 'react-bootstrap';

class PostCreate extends Component {
  state = {
    title: '',
    body: '',
    catId: '',
    options: [],
    show: false,
    catModal: false,
    name: '',
    selected: [],
    errors: {},
  };
  schema = {
    title: Joi.string().required().label('Title'),
    body: Joi.string().required().label('Body'),
  };

  validate = () => {
    const data = {
      title: this.state.title,
      body: this.state.body,
    };
    const { error } = Joi.validate(data, this.schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  propertyValidate = ({ name, value }) => {
    const data = {
      [name]: value,
    };
    const schema = {
      [name]: this.schema[name],
    };
    const { error } = Joi.validate(data, schema);
    return error ? error.details[0].message : null;
  };

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3001/catagory');
    this.setState({ options: data });
    // console.log(this.state.options);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    const { title, body, selected } = this.state;
    let list = selected.filter((item) => item !== 'name');
    const data = {
      title: title,
      body: body,
      catagory: list,
    };
    try {
      await axios.post('http://localhost:3001/post', data);
      this.setState({
        title: '',
        body: '',
        selected: [],
        show: false,
      });
      this.props.history.push('/post');
    } catch (err) {
      console.log(err);
    }
  };
  onChange = (e) => {
    const errors = { ...this.state.errors };
    const error = this.propertyValidate(e.target);
    if (error) errors[e.target.name] = error;
    else delete errors[e.target.name];

    if (e.target.value === 'new') {
      this.setState({
        catModal: true,
        show: false,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
      errors,
    });
  };
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
  handleCatClose = () => {
    this.setState({
      catModal: false,
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
      name: '',
      show: true,
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
        <h2 className='text-primary'>Post Create</h2>
        <div className='row'>
          <div className='col-md-10'>
            <Button variant='primary' onClick={this.handleShow}>
              Create New Post
            </Button>

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
                    error={this.state.errors.title}
                  />
                  <TextareaGroup
                    name='body'
                    placeholder='body'
                    value={this.state.body}
                    onChange={this.onChange}
                    error={this.state.errors.body}
                  />
                  {/* <SelectGroup
                    name='catId'
                    value={this.state.catId}
                    onChange={this.onChange}
                    options={this.state.options}
                    onSelectChange={this.onSelectChange}
                  /> */}
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

        {/* catgory create modal */}
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

export default PostCreate;
