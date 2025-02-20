
interface TaskData {
    id?: string,
    name: string,
    dueDate: string,
    assigneeId?: string,
    pointEstimate: string,
    tags: string[],
    status: string
}