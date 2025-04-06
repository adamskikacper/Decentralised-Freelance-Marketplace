import type { Meta, StoryObj } from "@storybook/react";
import Jobs from "./index";
import { BrowserRouter } from "react-router-dom";

/**
 * Jobs is a component that displays a list of jobs for client users.
 * It shows both active and completed jobs with filtering options.
 */
const meta = {
 title: "Dashboardv2/Client/Jobs",
 component: Jobs,
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
  onMessage: { action: "message" },
  onJobDetails: { action: "jobDetails" },
 },
 tags: ["autodocs"],
} satisfies Meta<typeof Jobs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Jobs view
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
