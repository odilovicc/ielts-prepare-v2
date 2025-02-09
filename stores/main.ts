import { type INotification } from "~/types/helpers"

export const useMainStore = defineStore('main', () => {

    const notifications = ref<INotification[] | never>([])

    function addNotification(body: INotification) {
        notifications.value.push(body)
    }

    function clearNotifications() {
        notifications.value = []
    }
    

    return {
        addNotification,
        notifications,
        clearNotifications
    }
})