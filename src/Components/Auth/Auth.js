import Axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import validateForm from '../../utils/validateform'
import validEmailRegex from '../../utils/emailRegex'
import './Auth.css'
import { AuthContext } from '../../context/auth-context'
import Spinner from '../../Containers/Spinner/Spinner';
export class Auth extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: ''
            },
            error: {
                message: '',
                code: ''
            },
            isloading: false,
            isLoginMode: true,

            errors: {
                email: '',
                password: ''
            }
        }
    }


    mySubmitHandler = (event) => {
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context
        event.preventDefault();

        if (validateForm(this.state.errors)) {
        } else {
        }
        if (this.state.isLoginMode) {
            Axios.post('/user/login', this.state.user)
                .then(response => {
                    this.setState(pre => ({
                        isloading: false
                    }))
                    this.props.history.push('/')
                    auth.login(response.data.userId, response.data.token);
                    return Axios.get('/profile/viewprofile')
                }).then(data => {
                    let profile = data.data.profile.username
                    localStorage.setItem(
                        'profileData',
                        JSON.stringify({
                            "username": profile
                        }))


                }).catch(e => {

                    this.setState({
                        isloading: false,
                        error: {
                            ...this.state.error, message: e.response.data.message,
                            code: e.response.status
                        }
                    });
                })

        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
            Axios.post('/user/signup', this.state.user).then(response => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
                .catch(e => {
                    this.setState({ error: true });
                })
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
    }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'email':
                if (value.length === 0) {
                    errors.email =
                        value.length < 5
                            ? '输入邮箱!'
                            : '';
                    break;
                }
                if (value.length > 0) {
                    errors.email =
                        validEmailRegex.test(value)
                            ? ''
                            : '邮箱无效!';
                    break;
                }
                break;
            case 'password':
                if (value.length > 0) {
                    errors.password =
                        value.length < 6
                            ? '密码必须6个字符长!'
                            : '';
                }

                if (value.length === 0) {
                    errors.password =
                        value.length === 0
                            ? '输入密码!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    }

    switchLoginhandler = () => {
        this.setState(pre => ({
            isLoginMode: !pre.isLoginMode
        }))
    }

    render() {
        let isLoading
        let iserror

        if (this.state.isloading) {
            isLoading = (
                <>
                    <div className="container loading">
                        <div className="mar-20">
                            <Spinner />
                        </div>
                    </div>
                </>
            )
        }

        if (this.state.error.code) {
            iserror = (
                <>
                    <div className="container error container-short">
                        <div className="mar-20">
                            <h5>错误代码 - {this.state.error.code}</h5>
                            <h4>错误信息 - {this.state.error.message}</h4>
                        </div>
                    </div>
                </>
            )
        }
        return (<>

            {isLoading}
            {iserror}

            <div className="container container-short py-5">
                <h1 className="pt-2 py-2">{this.state.isLoginMode ? '登录 ' : '注册'}</h1>
                <hr></hr>
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                    <div className="form-group">
                        <label htmlFor="email">邮箱 </label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.user.email}
                            className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')}
                            placeholder="输入邮箱"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.email.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.email}</span></div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">密码 </label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            className={"form-control " + (this.state.errors.password ? 'is-invalid' : '')}
                            placeholder="输入密码"
                            required="必须输入"
                            data-error="输入姓名."
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.password.length > 0 &&
                            <div className="mt-1"> <span className='error text-danger'>{this.state.errors.password}</span></div>}

                    </div>

                    <div className="form-group">
                        <button style={{ marginRight: '15px' }}
                            type='submit'
                            className="btn btn-primary"
                            disabled={this.state.user.email && this.state.user.password
                                && (validateForm(this.state.errors)) ? '' : 'disabled'}
                        >
                            {this.state.isLoginMode ? '登录' : '注册'}
                        </button>

                        <button
                            type='button'
                            className="btn btn-primary"
                            onClick={this.switchLoginhandler}
                        >换去 {this.state.isLoginMode ? '注册' : '登录'} </button>
                    </div>
                </form>

            </div>
        </>
        )
    }
}

export default withRouter(Auth)