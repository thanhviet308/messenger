import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

const Friends = (props) => {
    const { fndInfo, msgInfo } = props.friend;
    const myId = props.myId;
    const { activeUser } = props;

    return (
        <div className='friend'>
            <div className='friend-image'>
                <div className='image'>
                    <img src={`./image/${fndInfo.image}`} alt='' />
                    {
                        activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === fndInfo._id) ? <div className='active_icon'></div> : ''
                    }
                </div>
            </div>

            <div className='friend-name-seen'>
                <div className='friend-name'>
                    <h4 className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message Fd_name ' : 'Fd_name'} >{fndInfo.userName}</h4>
                    <div className='msg-time'>
                        {
                            msgInfo && msgInfo.senderId === myId ? <span>Bạn: </span> : <span className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message ' : ''}> {' '} </span>
                        }

                        {
                            msgInfo && msgInfo.message && typeof msgInfo.message.text === 'string'
                                ? <span className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message ' : ''}>
                                    {msgInfo.message.text.slice(0, 10)}
                                </span>
                                : msgInfo && msgInfo.message.image
                                    ? <span>Đã gửi một hình ảnh </span>
                                    : <span>Đã kết nối với bạn </span>
                        }

                        <span> · {msgInfo ? moment(msgInfo.createdAt).format('HH:mm') : moment(fndInfo.createdAt).format('HH:mm')}</span>
                    </div>

                </div>

                {
                    myId === msgInfo?.senderId ?
                        <div className='seen-unseen-icon'>
                            {
                                msgInfo.status === 'seen'
                                    ? <img src={`./image/${fndInfo.image}`} alt='' />
                                    : msgInfo.status === 'delivared'
                                        ? <div className='delivared'><FaRegCheckCircle /></div>
                                        : <div className='unseen'></div>
                            }
                        </div>
                        :
                        <div className='seen-unseen-icon'>
                            {
                                msgInfo?.status !== undefined && msgInfo?.status !== 'seen'
                                    ? <div className='seen-icon'></div>
                                    : ''
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Friends;
