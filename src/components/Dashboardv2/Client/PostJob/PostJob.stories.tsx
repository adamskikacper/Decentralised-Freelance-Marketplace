import type { Meta, StoryObj } from "@storybook/react";
import PostJob from "./index";
import { BrowserRouter } from "react-router-dom";

/**
 * PostJob is a component that allows client users to post new jobs.
 * It provides a form for entering job details and submitting them.
 */
const meta = {
 title: "Dashboardv2/Client/PostJob",
 component: PostJob,
 parameters: {
  layout: "padded",
 },
 decorators: [
  (Story) => (
   <BrowserRouter>
    <div style={{ maxWidth: "1200px" }}>
     <Story />
    </div>
   </BrowserRouter>
  ),
 ],
 argTypes: {
  onSubmit: { action: "formSubmitted" },
 },
 tags: ["autodocs"],
} satisfies Meta<typeof PostJob>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default PostJob view
 */
export const Default: Story = {
 args: {
  isLoading: false,
 },
};

/**
 * Loading state
 */
export const Loading: Story = {
 args: {
  isLoading: true,
 },
};
