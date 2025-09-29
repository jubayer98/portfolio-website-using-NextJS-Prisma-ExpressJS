export type User = { id: string; email: string; name?: string | null };
export type Post = {
    id: string;
    title: string;
    content?: string | null;
    published: boolean;
    authorId: string;
    createdAt: string;
    updatedAt: string;
};
