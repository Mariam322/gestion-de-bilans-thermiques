

import React, { Component } from 'react';
import API from './Api/Api';
import Select from 'react-select';



export default class Test extends Component {
    constructor(props) {
        super(props);
           
        this.state = {
          id:'',
          nom:'',
          prenom:'',
          mail:'',
   
          clientid: [],
        clients: [],}
      };
     
      async getOptions(){
        const res = await API.get('/getidclient')
        const data = res.data
        
    
        const options = data.map(d => ({
          "value" : d.id,
          "label": d.id
        }))
    
        this.setState({clientid: options})
    
      }
      
      GetData = async (e) => {
        await API.get('/getclient/'+e.value)
        .then(response => { 
          console.log(response)
           this.setState({
            nom: response.data[0].nom,
            prenom: response.data[0].prenom,
            mail: response.data[0].mail,

        
               });
               })
               .catch(function (error) {
               console.log(error);
               
               })
              }

      handleChange=(e)=>{
      
       this.setState({id:e.value})
      }
      
    
      componentDidMount(){
          this.getOptions()
      }
      
        
      render() {
        
    
        return (
          
          <div>
           <Select   options={this.state.clientid} onChange={this.handleChange.bind(this)}/>
            
       
        <div className="newProjectItem">
          <label>Nom Client :</label>
          <input type="text" placeholder="nom"  value={this.state.nom} onChange={this.GetData} 
          name="nom"  required />
        </div>
       
        <div className="newProjectItem">
          <label>Prenom Client:</label>
          <input type="text" placeholder="prenom"  value={this.state.prenom} onChange={this.GetData} 
          name="prenom"    required />
        </div>
        <div className="newProjectItem">
          <label>Mail Client:</label>
          <input type="mail" placeholder="mail"  value={this.state.mail} onChange={this.GetData} 
          name="mail" required />
        </div>
          </div>
          
        )
      }
    }
 /*   <Select id={this.state.id} options={this.state.projet}   onChange={this.handleChange.bind(this)} />*/