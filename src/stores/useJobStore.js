import { create } from "zustand";

const useJobStore = create((set) => {
    return {
        jobs: [],
        fetched: false,
        setJobs: (jobs) => set({ jobs, fetched: true }),
    };
});

export default useJobStore;
