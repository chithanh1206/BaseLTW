export interface Task {
  id: string;
  name: string;
  description?: string;
  deadline: string;
  status: "todo" | "inprogress" | "done";
  priority: "high" | "medium" | "low";
  tags: string[];
}