import React from 'react';
import axios from 'axios';
    //iki türlü component var. function ve class component. 
    //class component mutlaka bir render method u return etmek zorunda.
    //class component stateful, functional component ise stateless deniyor. 
    //Kullanıcı bilgilerini tutabilmek için class component'i kullandık.
    //her node modülünün en azından 1 fonksiyonu ya da class' ı export etmesi gerekiyor.
class UserSignupPage extends React.Component{

  state = {
      username: null,
      displayName:null,
      password:null,
      passwordRepeat:null

  }  
//      //state update' i yapılacağı zaman setState fonksiyonu ile gerçekleştir.
//      //state in değiştiği bilgisini React'a haber vererek tekrardan render methodunu tetikliyoruz.
//      //state'teki güncel değerler render edilerek ui'daki değişimi görmüş oluyoruz.
  onChange = event =>{

    const {name , value} = event.target;
      this.setState({
          [name]:value
      })
  }
  onClickSignup = event =>{
      //browser bizim yerimize form un içeriğini alıp göndermeye çalışıyor. Bu eventi engellemek için
      event.preventDefault();
      const {username,displayName,password} =this.state;
      const body ={
          //javascript'te eğer key ve value aynı isimse bir tanesini yazmamız yeterli.
          username,
          displayName,
          password:password
      }
      axios.post('/api/1.0/users',body)

  }
    
    render(){
        return(
            <form>
            <h1>Sign UP</h1>
            <div>
            <label>Username</label>
            <input name="username" onChange={this.onChange}/>
            </div>
            <div>
            <label>Display Name</label>
            <input name="displayName" onChange={this.onChange}/>
            </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" onChange={this.onChange}/>
        </div>
        <div>
            <label>Password Repeat</label>
            <input name="passwordRepeat" type="password" onChange={this.onChange}/>
        </div>
        <button onClick={this.onClickSignup}>
            Sign Up
        </button>
            </form>
        );
    }

}
export default UserSignupPage;