import { v } from "convex/values";
import { mutation, query } from "./_generated/server";



export const archived = mutation({
  args: {
    id: v.id("documents")
  },

  handler: async (ctx, args) => {
    const document = await ctx.db.patch(args.id, {
      isArchived: true
    });
    return document
  }
})
export const Unarchived = mutation({
  args: {
    id: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const document = await ctx.db.patch(args.id, {
      isArchived: false,
      IsFavourite: false
    });
    return document
  }
})

export const deleteDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.delete(args.id)
    return document
  }
})

export const unfavorite = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.patch(args.id, {
      IsFavourite: false
    });

    return document
  }

})
export const favorite = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.patch(args.id, {
      IsFavourite: true
    });

    return document
  }

})

export const getTrash = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // console.log(args.userId)
    const documents = await ctx.db
      .query("documents")
      .withIndex('by_user', (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  }
});


export const getById = query({
  args: {
    documentId: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId)

    return document;
  }
});


export const getSidebar = query({
  args: {
    userId: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },

  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q
          .eq("userId", args.userId)
          .eq("parentDocument", args.parentDocument)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();
    return documents;
  },
});


export const create = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },

  handler: async (ctx, args) => {
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
      IsFavourite: false,
      userId: args.userId,
    });

    return document;
  }
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {

    const { id, ...rest } = args

    const existDocuments = await ctx.db.get(args.id)
    if (!existDocuments) {
      throw new Error("this page not found")
    }

    const document = await ctx.db.patch(args.id, {
      ...rest
    })

    return document;

  }
})

