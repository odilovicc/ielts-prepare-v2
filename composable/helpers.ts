export const usePromiseCallbacks = () => {
    const {addNotification} = useMainStore()

    const resolvePromise = (data?:any, dataShouldReturn?: boolean) => {
        addNotification({
            title: data.title,
            body: data.body,
            severity: "success"
        })

        if(dataShouldReturn) {
            Promise.resolve(data.data)
        }
    }
    const rejectPromise = (data?:any, dataShouldReturn?: boolean) => {
        addNotification({
            title: data.title,
            body: data.body,
            severity: "error"
        })

        if(dataShouldReturn) {
            Promise.resolve(data.data)
        }
    }

    return {
        resolvePromise,
        rejectPromise
    }
}