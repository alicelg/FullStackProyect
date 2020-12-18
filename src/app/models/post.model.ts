export class Post {
    id: number;
    title: string;
    main_image: string;
    keywords: string;
    summary: string;
    category: string;
    text: string;
    date: Date;
    type: number;
    user_id: number;
}

export class Comment {
    text: string;
}