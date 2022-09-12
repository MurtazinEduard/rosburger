import { Divider } from '@mui/material'
import React, { FC } from 'react'
import { IComments } from '../../redux/types'
import style from './Comment.module.sass'
const CommentItem: FC<IComments> = ({user, comment,date}) => {
  const newDate = new Date(Number(date))
  return (
    <div className={style.main}>
        <div className={style.main_avatar}>{user[0]}</div>
        <div className={style.main_block}>
            <div className={style.main_block__name}>{user}</div>
            <div className={style.main_block__comment}>{comment}</div>
            <Divider style={{margin: '3px 0'}}/>
            <div>{newDate.toLocaleDateString()}</div>
        </div>
    </div>
  )
}

export default CommentItem