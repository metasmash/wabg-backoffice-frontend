import React, { useEffect } from 'react'
import {
    NOTIFICATION_TYPE,
    ReactNotifications,
    Store,
} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

interface NotificationProps {
    notificationType: NOTIFICATION_TYPE
    message: string
}

export const addNotification = ({
    notificationType,
    message,
}: NotificationProps) => {
    const generateTitle = () => {
        switch (notificationType) {
            case 'danger':
                return 'Error'
            case 'success':
                return 'Success'
        }
    }

    Store.addNotification({
        title: generateTitle(),
        message: message,
        type: notificationType,
        insert: 'bottom',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 5000,
        },
    })
}

export const Notification = () => {
    return <ReactNotifications />
}
