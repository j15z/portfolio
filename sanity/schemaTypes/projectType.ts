import { FolderIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "githubUrl",
      type: "url",
      title: "GitHub URL",
    }),
    defineField({
      name: "liveUrl",
      type: "url",
      title: "Live URL",
    }),
    defineField({
      name: "learnMoreUrl",
      type: "url",
      title: "Learn More URL (Optional)",
      description:
        "If provided, overrides the default internal project page link",
    }),

    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured",
      description: "Featured projects appear first in the portfolio",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      featured: "featured",
    },
    prepare(selection) {
      const { featured } = selection;
      return {
        ...selection,
        subtitle: featured ? "Featured Project" : "Project",
      };
    },
  },
});
