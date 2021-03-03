import React from 'react';
import axios from 'axios';
import {signup} from '../api/apiCalls';
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
      passwordRepeat:null,
      pendingApiCall : false

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
  onClickSignup = async event =>{
      //browser bizim yerimize form un içeriğini alıp göndermeye çalışıyor. Bu eventi engellemek için
      event.preventDefault();
      const {username,displayName,password} =this.state;
      const body ={
          //javascript'te eğer key ve value aynı isimse bir tanesini yazmamız yeterli.
          username,
          displayName,
          password:password
      }
      this.setState({
          pendingApiCall:true
      });
      //kodun burada beklemesini ve cevabı response a atıp devam edebilmemizi sağlıyor.
      try{
        const response = await signup(body);
      }catch(error){

      }
      this.setState({pendingApiCall:false})
      //async çalıştığı için akış bitmeden tüm case leri düşünmemiz gerektiği için async in tamamlandığından emin olmak için böyle yaptık.
    // signup(body)
    //   .then((response) => {
    //         this.setState({pendingApiCall:false})
    //   })
    //   .catch(error =>{
    //       this.setState({pendingApiCall:false});
    //   });
  }
    
    render(){
        const {pendingApiCall} = this.state;
        return(
            <div className="container">
 <form>
            <h1 className="text-center">Sign UP</h1>
            <div className="mb-3">
            <label>Username</label>
            <input name="username" className="form-control" onChange={this.onChange}/>
            </div>
            <div className="mb-3">
            <label>Display Name</label>
            <input name="displayName" className="form-control" onChange={this.onChange}/>
            </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" className="form-control" onChange={this.onChange}/>
        </div>
        <div className="mb-3">
            <label>Password Repeat</label>
            <input name="passwordRepeat" type="password"  className="form-control" onChange={this.onChange}/>
        </div>
        <div>
        <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall}>
        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            Sign Up
        </button>
        </div>
            </form>
            </div>
           
        );
    }

}
export default UserSignupPage;