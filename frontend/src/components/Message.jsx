import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegCheckCircle } from "react-icons/fa";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
    const { myInfo } = useSelector((state) => state.auth);
    return (
        <>
            <div className='message-show'>
                {
                    message && message.length > 0 ? message.map((m, index) =>

                        m.senderId === myInfo.id ? <div ref={scrollRef}
                            className='my-message'>
                            <div className='image-message'>
                                <div className='my-text'>
                                    {m.message.text === '' ? (
                                        <img className='message-image' src={`./image/${m.message.image}`} alt='' />
                                    ) : (
                                        <p className='message-text'>{m.message.text}</p>
                                    )}
                                    {
                                        index === message.length - 1 && m.senderId === myInfo.id ? (
                                            m.status === 'seen' ? (
                                                <img className='img' src={`./image/${currentfriend.image}`} alt='' />
                                            ) : m.status === 'delivared' ? (
                                                <span><FaRegCheckCircle /></span>
                                            ) : (
                                                <span><FaRegCheckCircle /></span>
                                            )
                                        ) : ''
                                    }


                                </div>
                            </div>
                            <div className='time'>
                                {moment(m.createdAt).startOf('mini').fromNow()}
                            </div>
                        </div> : <div ref={scrollRef} className='fd-message'>
                            <div className='image-message-time'>
                                <img src={`./image/${currentfriend.image}`} alt='' />
                                <div className='message-time'>
                                    <div className='fd-text'>
                                        {m.message.text === '' ? (
                                            <img className='message-image' src={`./image/${m.message.image}`} alt='' />
                                        ) : (
                                            <p className='message-text'>{m.message.text}</p>
                                        )}
                                    </div>
                                    <div className='time'>
                                        {moment(m.createdAt).startOf('mini').fromNow()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <div className='friend_connect'>
                        <img src={`./image/${currentfriend.image}`} alt='' />
                        <h3>{currentfriend.userName} đã kết nối với bạn</h3>
                        <span>{moment(currentfriend.createdAt).startOf('minute').fromNow()}</span>
                    </div>
                }
            </div>
            {
                typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend._id ? <div className='typing-message '>
                    <div className='message-show'>
                        <div className='fd-message'>
                            <div className='image-message-time'>
                                <img src={`./image/${currentfriend.image}`} alt='' />
                                <div className='message-time'>
                                    <div className='fd-text'>
                                        <p className='time'>Đang nhập ...</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''
            }
        </>
    )
};

export default Message;