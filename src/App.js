import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
var size=""

const App = () =>{
  var obj = {srcFunc:()=>{}}
  var userObj = {user:guest}
  const [CurrUser,setCurrUser] = React.useState(userObj)
  const [SearchFunction,setSrcFnc] = React.useState(obj)
  const getCurrUser = (user) =>{
    userObj.user = user
    setCurrUser(userObj)
  }
  const getSearchFunction = (crcFnc) =>{
    obj.srcFunc = crcFnc
    setSrcFnc(obj)
  }
  return <div>
    <div className="header" id="header">
      <Header searchFunction={SearchFunction}/>
    </div>
    <div className="body" id="body">
      <Body getSrcFnc={getSearchFunction} CurrUser={CurrUser}/>
    </div>
    <AccountControl getCurrUser={getCurrUser}/>
  </div>
}

const Header = (props) =>{
  return <div style={{color:"white",
                      fontSize:"20px",
                      marginLeft:"2rem",
                      fontFamily:"Sans-serif"}} >
    <b>SOME TEXT</b>
    <span className="search">
      <input type="text" className="textbox" placeholder="Поиск" id="search" onChange={()=>{props.searchFunction.srcFunc()}}/>
    </span>
  </div>
}
var users = [{
  name:"Ilias Zerman",
  userPic:"https://yt3.ggpht.com/ytc/AAUvwni3wjD4k3HaJ2b-rM0RMWUC2nbAEFPrQPq8MRNYzw=s900-c-k-c0x00ffffff-no-rj",
  login:"ilias_zet",
  password:"0000",
}]
const AccountControl = (props) =>{
  const [isLoged,setLogState] = React.useState(false)
  const [currUser,setCurrUser] = React.useState(guest)
  
  const signIn = () =>{
    var login = document.getElementById("login").value
    var password = document.getElementById("password").value
    var similarLogin = users.filter((user)=>user.login==login)
    if(similarLogin.length>0){
      var user=similarLogin[0]
      if(user.password==password){
        alert("Вы успешно вошли в аккаунт "+user.login)
        setLogState(true)
        setCurrUser(user)
        props.getCurrUser(user)
      }
      else alert("Пароль введен неверно!")
    }
    else alert("Пользователь с таким логином не существует!")
  }
  
  const addUser = () =>{
    var name = document.getElementById("name").value
    var login = document.getElementById("login").value
    var pass1 = document.getElementById("password").value
    var pass2 = document.getElementById("password2").value
    var avatar = document.getElementById("avatar").value
    if(pass1==pass2){
      if(pass1!=""&login!=""){
        var similarLogin = users.filter((user)=>user.login==login)
        if(similarLogin.length==0){
          //avatar.length==0?avatar=guest.userPic:null
          //name.length==0?name=login:null
          users.push({
                      name:name,
                      userPic:avatar,
                      login:login,
                      password:pass1,
                    })
          setLogState(false)
          alert("Регистрация прошла успешно!")
        }
        else alert("Данный логин уже используется! Измените параметры и повторите попытку")
      }
      else alert("Логин или пароль введены неверно! Проверьте правиьность ввода и повторите попытку")
    }
    else alert("Введенные пароли не совпадают! Проверьте правиьность ввода и повторите попытку")
  }
  const logOut = () =>{
    setLogState(false)
    setCurrUser(guest)
    props.getCurrUser(guest)
  }
  
  switch(isLoged){
    case true: return <a onClick={()=>setLogState("logoutForm")}>
      <span className='loged-form'>
      <b style={{position:"relative",
                 right:"1rem",
                 top:"10px"}}>{currUser.name}</b>
      <img class="article-author-img" 
           src={currUser.userPic} 
           />
      </span></a>
    case false:return <span className="account-control">
              <div>
                <button className="button signin" 
                        onClick={()=>{setLogState("loginForm")}}>
                  Sign in</button>
                <button className="button redButton"
                        onClick={()=>{setLogState("registerForm")}}>Register</button>
              </div>
            </span>
    case "loginForm":return <div className="login-form">
              <lable>Login:</lable><br/>
              <input type="text" className="textbox" id="login"/><br/>
              <lable>Password:</lable><br/>
              <input type="password" className="textbox" id="password"/><br/>
              <button className="button signin" onClick={()=>signIn()}>Log in</button>
              <button onClick={()=>setLogState(false)}>Cancel</button><br/>
              <lable>Haven't account? 
                <a onClick={()=>{setLogState("registerForm")}}>Click here</a>
              </lable>
            </div>
    case "registerForm":return <div className="login-form">
              <lable>Login:</lable><br/>
              <input type="text" className="textbox" id="login"/><br/>
              <lable>Password:</lable><br/>
              <input type="password" className="textbox" id="password"/><br/>
              <lable>Repeat password:</lable><br/>
              <input type="password" className="textbox" id="password2"/><br/>
              <lable>Name, surname:</lable><br/>
              <input type="text" className="textbox" id="name"/><br/>
              <lable>Avatar image path:</lable><br/>
              <input type="text" className="textbox" id="avatar"/><br/>
              <button className="button signin" onClick={()=>addUser()}>Register</button>
              <button onClick={()=>setLogState(false)}>Cancel</button><br/>
              <lable>Have an account? 
                <a onClick={()=>{setLogState("loginForm")}}>Click here</a>
              </lable>
            </div>
    case "logoutForm":return <div className="login-form"><span className="">
      <lable>You signed as </lable><b style={{}}>{currUser.name}</b><br/>
      <button className="redButton" onClick={()=>logOut()}>Logout</button>
      <button onClick={()=>setLogState(true)}>Cancel</button>
      </span>
      </div>
  }
  
  
}

const Menu = (props) =>{
  return <div>
    <div className="menu">Navigation
        <a href="#"><div className="nav button">Profile</div></a>
        <a href="#"><div className="nav button">link2</div></a>
        <a href="#"><div className="nav button">link3</div></a>
        <a href="#"><div className="nav button">link4</div></a>
        <a href="#"><div className="nav button">link5</div></a>
      </div>
  </div>
}

const Body = (props) =>{
  return <div>
    <Menu/>
    <div className="content" id="content">
      <Content getSrcFnc={props.getSrcFnc} CurrUser={props.CurrUser}/>
    </div>
  </div>
  
}

const guest = {name:"Guest",userPic:"https://www.hostobzor.ru/xo/images/defaultUserBig.png"}
const likeImg = "https://e.unicode-table.com/orig/ce/7cdb1cae544d41f3c51f35ff8fcdf0.png"
const commentImg = "https://e.unicode-table.com/orig/f5/f53d2db3262d9950d1e0fb1b74244d.png"
const IZ_userpic = "https://yt3.ggpht.com/ytc/AAUvwni3wjD4k3HaJ2b-rM0RMWUC2nbAEFPrQPq8MRNYzw=s900-c-k-c0x00ffffff-no-rj"
var postArr = [{
 title:"Who are the Illuminati - and what do they control?",
 text:"The original Illuminati group was founded in Bavaria in the 18th century by Adam Weishaupt, an anti-clerical professor who wanted to limit the interference of the Church in public life. Convinced that religious ideas were no longer an adequate belief system to govern modern societies, “he decided to find another form of ‘illumination’; a set of ideas and practices that could be applied to radically change the way European states were run”, reports National Geographic. He based his secret society on the Freemasons, with a hierarchy and mysterious rituals, and named it the Order of Illuminati to reflect the enlightened ideals of its educated members.",
 id:0,
 likes:2753,
 date: (new Date()).toLocaleString(),
 imgPath:"https://i.ytimg.com/vi/psQ9B6aF5v8/maxresdefault.jpg",
 comments:[[IZ_userpic,"Ilias Zerman","Тут можно комменты оставлять, если че :)"],[IZ_userpic,"Ilias Zerman","И лайки ставить, и добавлять посты, и удалять посты, и фильтровать их по названию"]],
},
{
 title:"Economic of Ukraine",
 text:"After years of political and economic tension, the Ukrainian economy had started to stabilise, but the outbreak of COVID-19 reversed this trend. According to the IMF, GDP growth fell to an estimated -7.2% in 2020 (from 3.2% in 2019), and is expected to pick up to 3% in 2021 and 3.2% in 2022, subject to the post-pandemic global economic recovery. Activity should be supported by a revival of external and domestic demand, as well as fiscal and monetary stimulus.",
 id:2,
 likes:3021,
 date: (new Date()).toLocaleString(),
 imgPath:"https://i.redd.it/4e3zqdcxhhf41.jpg",
 comments:[[IZ_userpic,"Ilias Zerman","Но эти изменения отображаются только на твоем комплюхтере"]],
},
{
 title:"Biden Moves To End Trump-Era Asylum Agreements With Central American Countries",
 text:"The Biden administration is ending agreements with the governments of El Salvador, Guatemala and Honduras that the Trump administration said were meant to help drive down the number of migrants seeking asylum at the U.S. border. The State Department announced on Saturday that it had suspended the so-called Asylum Cooperative Agreements, with immediate effect, and initiated the process to terminate them.",
 id:1,
 likes:5732,
 date: (new Date()).toLocaleString(),
 imgPath:"https://media.npr.org/assets/img/2021/02/06/ap21035689362211_custom-e742027f65143684c45425888cf704e4d226b418-s800-c85.jpg",
 comments:[],
},
]
var currId=2
var postBuffer

const Content = (props)=>{
  const [posts,setPosts] = React.useState(postArr)
  
  const SearchTest = () =>{
    if(postBuffer==undefined) postBuffer=posts
    var str = document.getElementById("search").value.toLowerCase()
    if(str.length>0){
      document.getElementById("addPostButton").style.display="none"
      postArr = postBuffer.filter((post) => post.title.toLowerCase().indexOf(str)!=-1)
      setPosts(postArr)
    }
    else {
      document.getElementById("addPostButton").style.display="block"
      setPosts(postBuffer)
      postBuffer=undefined
    }
  }
  props.getSrcFnc(SearchTest)
  
  const AddPost = () =>{
    postArr = [{
      title:document.getElementById("title").value,
      text:document.getElementById("text").value,
      id:++currId,
      likes:0,
      date: (new Date()).toLocaleString(),
      imgPath:document.getElementById("url").value,
      comments:[],
      },...postArr]
      setPosts(postArr)
      HideForm()
      alert("Статья успешно опубликована!")
  }
  const ShowForm = () =>{
    document.getElementById("addPostButton").style.display="none"
    document.getElementById("addPostForm").style.display="block"
  }
  const HideForm = () =>{
    document.getElementById("addPostButton").style.display="block"
    document.getElementById("addPostForm").style.display="none"
    document.getElementById("title").value=""
    document.getElementById("text").value=""
    document.getElementById("url").value=""
  }
  
  const DelFunc = (id) =>{
    if(Window.confirm("Отменить это действие будет невозможно.\nВы уверены что хотите удалить запись?"))
    postArr = []
    posts.map((post)=>{
      if(post.id != id) postArr.push(post)
    })
    setPosts(postArr)
  }
  
  const LikeFunc = (id) =>{
    postArr = posts.map((post)=>{
      if(post.id === id){
        return {
            title:post.title,
            text:post.text,
            id:post.id,
            likes:++post.likes,
            date: post.date,
            imgPath:post.imgPath,
            comments:post.comments,
        }
      }
      else return post
    })
    setPosts(postArr)
  }
  
  const commentFunc = (id,text) =>{
    var user = props.CurrUser.user
    postArr = posts.map((post)=>{
      if(post.id === id){
        var comments=post.comments
        return {
            title:post.title,
            text:post.text,
            id:post.id,
            likes:post.likes,
            date: post.date,
            imgPath:post.imgPath,
            comments:[...comments,[user.userPic,user.name,text]],
        }
      }
      else return post
    })
    setPosts(postArr)
  }
  const ReturnComments = (id) =>{
    const [hiddenComments,setHiddenComments] = React.useState(true)
    return posts.map((post)=>{
      if(post.id === id){
        var comments = post.comments
        if(comments.length<=2){
            return comments.map((comment)=>{
            return <Comment userpic={comment[0]} username={comment[1]} text={comment[2]}/>
          })
        }
        else{
          if(hiddenComments){
            size = comments.length
            return <div>
              <Comment userpic={comments[size-2][0]} username={comments[size-2][1]} text={comments[size-2][2]}/>
              <Comment userpic={comments[size-1][0]} username={comments[size-1][1]} text={comments[size-1][2]}/>
              <div className="load-all-comments">
                <a href="#" onClick={()=>setHiddenComments(false)}>Load all comments</a>
              </div>
            </div>
          }
          else{
            return <div>{comments.map((comment)=>{
            return <Comment userpic={comment[0]} username={comment[1]} text={comment[2]}/>
            })}
              <div className="load-all-comments">
                  <a href="#" onClick={()=>setHiddenComments(true)}>Hide comments</a>
                </div>
            </div>
          }
        }
        
      }
    })
  }
  
  return <div>
        <button id="addPostButton" onClick={()=>ShowForm()}>Add post</button>
    <div>
      <div className="card" id="addPostForm" style={{display:"none"}}>
        <input type="text" id="title" className="textbox" placeholder="Заголовок"/>
        <input type="text" id="url" className="textbox" placeholder="Ссылка на изображение"/>
        <br/><textarea id="text" rows="4" placeholder="Введите текст"/><br/>
        <button onClick={()=>AddPost()}>Add post</button>
        <button className="redButton" onClick={()=>HideForm()}>Cancel</button>
      </div>
    </div>
    { posts.map((post)=>{
      return <Post 
               title={post.title} 
               text={post.text} 
               id={post.id} 
               date={post.date} 
               likes={post.likes} 
               comments={post.comments}
               imgPath={post.imgPath}
               likeFunction={LikeFunc}
               deleteFunction={DelFunc}
               returnComments={ReturnComments}
               addCommentFunction={commentFunc}/>
    })}</div>
}

const Post = (props)=>{
  const show_cbx = () =>{
      vis=true
      setCommentBox(vis)
  }
  const hide_cbx = () =>{
      vis=false
      setCommentBox(vis)
  }
  
  const addComment = props.addCommentFunction
  
  var vis=false
  const [cbx_state,setCommentBox] = React.useState(vis)
    return <div className='card'>
      <div className="post-info">id:{props.id+". "}Опубликовано:{props.date}</div>
      {props.imgPath==""?null:<div className="box"><img src={props.imgPath} alt=""/></div>}
      <p className="post-title">{props.title}</p>
      <p className="post-text">{props.text}</p>
      <button className='ml-1 btn' onClick={() => props.likeFunction(props.id)}>{props.likes+" "}
        <img src={likeImg} width="14px"/>
      </button>
      <button className='btn' onClick={()=>{show_cbx()}}>{props.comments.length+" "}
        <img src={commentImg} width="14px"/>
      </button>
      <button className='redButton' onClick={()=>props.deleteFunction(props.id)}>DELETE</button>
      <p/>
      <div id="commentArea">{props.returnComments(props.id)}
        <div><CommentBox 
                                   id={props.id} 
                                   visibility={cbx_state} 
                                   hideFunc={hide_cbx} 
                                   showFunc={show_cbx}
                                   addCommentFunc={addComment}/>
        </div>
      </div><br/>
    </div>
}

const CommentBox = (props) =>{
  if(props.visibility){
    return <div style={{width:"97%",margin:"10px"}}>
    <textarea placeholder="Введите комментарий" id={"newComment"+props.id} rows={4}/>
    <button onClick={()=>{
          props.addCommentFunc(props.id,document.getElementById("newComment"+props.id).value)
          props.hideFunc()}}>Add comment
      </button>
    <button className="redButton" onClick={()=>props.hideFunc()}>Cancel</button>
  </div>
  }
  else return null
  
}

const Comment = (props) =>{
  return <div className="comment-box">
            <img class="article-author-img" src={props.userpic} />
            <b className="comment-author">{props.username}</b><br/><text className="comment-text">{props.text}</text>
  </div>
}
export default App;
