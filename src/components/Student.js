import React from 'react';
import { nanoid } from 'nanoid';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      typeValue: 'Contarct',
      mainKey: '',
      defaultName: '',
      defaultSurname: '',
      defaultDate: '',
      btnText: 'Add',
    };
    this.changeSelect = this.changeSelect.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
  }
  changeSelect = (e) => {
    this.setState({
      typeValue: e.target.value
    })
  }
  deleteHandler = (key) => {
    this.state.students = this.state.students.filter((val) => {
      return val.key !== key
    });
    this.setState({
      students: this.state.students,
    });

  }
  editHandler = (key) => {
    let a = this.state.students.filter((val) => { return val.key === key });
    this.setState({
      mainKey: a[0].key,
      defaultName: a[0].name,
      defaultSurname: a[0].surname,
      defaultDate: a[0].date,
      typeValue: a[0].type,
      btnText: 'Update',
    })
  }
  submitStudent = (e) => {
    e.preventDefault();
    if (this.state.btnText === 'Add') {
        let student = {
          key: nanoid(),
          name: e.target.name.value,
          surname: e.target.surname.value,
          date: e.target.date.value,
          type: this.state.typeValue
        }
        e.target.reset();
        this.state.students.push(student);
        this.setState({
          students: this.state.students,
        });
    } else {
      let student = {
        key: this.state.mainKey,
        name: e.target.name.value,
        surname: e.target.surname.value,
        date: e.target.date.value,
        type: this.state.typeValue
      }
      e.target.reset();
      this.state.students = this.state.students.map((val) => { if (this.state.mainKey === val.key) { return student } else { return val } });
      this.setState({
        students: this.state.students,
        defaultName: '',
        defaultSurname: '',
        defaultDate: '',
        btnText: 'Add',
        mainKey: '',
        typeValue: 'Contarct',
      });

    }
  }
  render() {
    return (
      <div>
        <div className='container' >
          <div className='row py-4' >
            <div className='col-lg-3 col-12' >
              <div className='card'>
                <div className='card-body'>
                  <form onSubmit={this.submitStudent} >
                    <input type='text' defaultValue={this.state.defaultName} placeholder='Name...' name='name' className='form-control'></input>
                    <input type='text' placeholder='Surname ...' defaultValue={this.state.defaultSurname} name='surname' className='form-control my-3'></input>
                    <input type="date" defaultValue={this.state.defaultDate} placeholder='Date of birth' className='form-control'  name='date'></input>
                    <select className='form-control my-3' value={this.state.typeValue} onChange={this.changeSelect}  >
                      <option value='Contract' >Contract</option>
                      <option value='Grand' >Grand</option>
                    </select>
                    <div className='d-flex justify-content-end'>
                      <button type='submit' className='btn btn-success'>{this.state.btnText}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-lg-9 col-12 ' >
              <div className='card'>
                <div className='card-body  overflow-auto'>
                  <table className='table text-center  ' >
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Date of birth</th>
                        <th>Type of studying</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.students.map((element, index) => {
                          return <tr key={element.key}>
                            <td>{index + 1}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
                            <td>{element.date}</td>
                            <td>{element.type}</td>
                            <td><button type='button' className='btn btn-warning text-white' onClick={() => this.editHandler(element.key)}>Edit</button></td>
                            <td>
                              <button type='button' className='btn btn-danger text-white' onClick={() => this.deleteHandler(element.key)}>Delete</button></td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
