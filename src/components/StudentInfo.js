import React  from 'react';
import { FiEdit, FiUserCheck } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import {nanoid} from 'nanoid';

class StudentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students:[] ,
      typeValue : 'Contarct',
      dateType: 'text',
      mainKey: '',
      defaultName: '',
      defaultSurname: '',
      defaultDate: '',
      btnText: 'Add',
      btnColor: 'btn btn-primary',
      warnText: 'This student is addded successfully',
      warnColor: 'bg-success d-none text-white p-2 w-100 mb-3 text-center',
      icon: 'd-none',
      deleteWarn: 'bg-success d-none text-white p-2 w-100 mb-3 text-center',
    };
    this.input=React.createRef();
    this.changeSelect=this.changeSelect.bind(this);
    this.submitStudent=this.submitStudent.bind(this);
  }
  changeSelect=(e)=>{
    this.setState({
      typeValue: e.target.value
    })
  }
  componentDidMount(){
    this.input.current.focus();
    if(JSON.parse(localStorage.getItem('students')) !== null){
      this.setState({
        students: JSON.parse(localStorage.getItem('students'))
      })
    }
  }
  deleteHandler=(key)=>{
      this.state.students = this.state.students.filter((val) => {
        return val.key !== key
      });
    localStorage.setItem('students', JSON.stringify(this.state.students));
      this.setState({
        students: this.state.students,
        warnText: 'This student is deleted successfully',
        deleteWarn: 'bg-success text-white p-2 w-100 mb-3 text-center',
      });
    setTimeout(() => {
      this.setState({
        warnText: 'This student is addded successfully',
        deleteWarn: 'bg-success d-none text-white p-2 w-100 mb-3 text-center',
      });
    }, 1000);

  }
  editHandler=(key)=>{
    let  a = this.state.students.filter((val) => { return val.key === key });
    this.input.current.focus();
    this.setState({
      mainKey: a[0].key,
      defaultName: a[0].name,
      defaultSurname: a[0].surname,
      defaultDate: a[0].date,
      typeValue: a[0].type,
      btnText: 'Update',
      btnColor:'btn btn-warning text-white'
    })
  }
  submitStudent=(e)=>{
  e.preventDefault();
    if (this.state.btnText === 'Add') {
      if (e.target.name.value === '' || e.target.surname.value === '' || e.target.date.value==='' ){
        this.setState({
          warnText: 'Feilds must be filled !!!',
          warnColor: 'bg-danger text-white p-2 w-100 mb-3 text-center',
        });
        setTimeout(() => {
          this.setState({
            warnText: 'This student is addded successfully',
            warnColor: 'bg-success d-none text-white p-2 w-100 mb-3 text-center'
          });
        }, 1000);
      } else{
        let student = {
          key: nanoid(),
          name: e.target.name.value,
          surname: e.target.surname.value,
          date: e.target.date.value,
          type: this.state.typeValue
        }
        e.target.reset();
        this.state.students.push(student);
        localStorage.setItem('students', JSON.stringify(this.state.students));
        this.setState({
          students: this.state.students,
          typeValue: 'Contarct',
          warnColor: 'bg-success text-white p-2 w-100 mb-3 text-center',
          icon: ''
        });
        setTimeout(() => {
          this.setState({
            icon: 'd-none',
            warnColor: 'bg-success d-none text-white p-2 w-100 mb-3 text-center'
          });
        }, 2000);
      }
     
       } else 
      { 
      let student = {
        key: this.state.mainKey,
        name: e.target.name.value,
        surname: e.target.surname.value,
        date: e.target.date.value,
        type: this.state.typeValue
      }
      e.target.reset();
       this.state.students = this.state.students.map((val) => { if(this.state.mainKey === val.key){return student} else { return val} });
      localStorage.setItem('students', JSON.stringify(this.state.students));
      this.setState({
        students: this.state.students,
        defaultName: '',
        defaultSurname: '',
        defaultDate: '',
        btnText: 'Add',
        btnColor: 'btn btn-primary',
        mainKey: '',
        typeValue: 'Contarct',
        warnText: 'This student is updated successfully',
        warnColor: 'bg-success  text-white p-2 w-100 mb-3 text-center'
      });
      setTimeout(() => {
        this.setState({
          warnText: 'This student is addded successfully',
          warnColor: 'bg-success d-none text-white p-2 w-100 mb-3 text-center'
        });
      }, 1000);

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
                  <div className={this.state.warnColor}>{this.state.warnText} <FiUserCheck className={this.state.icon} /></div>
                  <form onSubmit={this.submitStudent} >
                    <input type='text' defaultValue={this.state.defaultName} placeholder='Name...' ref={this.input} name='name' className='form-control'></input>
                    <input type='text' placeholder='Surname ...' defaultValue={this.state.defaultSurname}  name='surname' className='form-control my-3'></input>
                    <input type={this.state.dateType} defaultValue={this.state.defaultDate}  placeholder='Date of birth' onFocus={() => { this.setState({ dateType: 'date' }) }} className='form-control' onBlur={() => { this.setState({ dateType: 'text' }) }}  name='date'></input>
                    <select className='form-control my-3' value={this.state.typeValue} onChange={this.changeSelect}  >
                      <option value='Contract' >Contract</option>
                      <option value='Grand' >Grand</option>
                    </select>
                    <div className='d-flex justify-content-end'>
                      <button type='submit' className={this.state.btnColor}>{this.state.btnText}</button>
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
                        this.state.students.map((element , index) =>{
                         return <tr key={element.key}>
                            <td>{index+1}</td>
                            <td>{element.name}</td>
                            <td>{element.surname}</td>
                            <td>{element.date}</td>
                            <td>{element.type}</td>
                           <td><button type='button' className='btn btn-warning text-white' onClick={() => this.editHandler(element.key)}><FiEdit /></button></td>
                            <td>
                             <button type='button' className='btn btn-danger text-white' onClick={() => this.deleteHandler(element.key)}><RiDeleteBin2Line /></button></td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                  <div className={this.state.deleteWarn}>{this.state.warnText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
