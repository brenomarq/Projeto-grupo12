import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// CRUD ususario
async function main() {
    await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            senha: req.body.password,
            gender: req.body.genero,
            cargo: req.body.cargo,
            profilePicture: req.body.pfpPath,
        },

    }),

        await prisma.user.delete({
            where: {
                id: userId,
            },
        });


    //CRUD post
    await prisma.post.create({
        data: {
            user_id: req.user.id,
            content: req.body.content,
        },
    });




    await prisma.post.update({
        data: {
            id: req.body.id,
            user_id: req.user.id,
            content: req.body.content,
            updated_at: req.body.atualizado,
            created_at: req.body.data,
        },
    });





    await prisma.post.delete({
        where: {
            id: postId,
        },
    });


    //CRUD comentarios
    await prisma.comment.create({
        data: {
            user_id: req.user.id,
            post_id: parseInt(req.params.id),
            content: req.body.content,
        },
    });

    await prisma.comment.update({
        data: {
            id: req.body.id,
            user_id: req.user.id,
            post_id: req.post.id,
            content: req.body.content,
            updated_at: req.body.atualizado,
            created_at: req.body.data,
        },
    });

    await prisma.comment.delete({
        where: {
            id: commentId,
        },
    });
}
