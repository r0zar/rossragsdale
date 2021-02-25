import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    events: null,
    setEvents: (events) => {
      set({ events })
    },
    cameraRotationY: Math.PI,
    cameraRotationX: -Math.PI / 2,
  }
})

export default useStore
