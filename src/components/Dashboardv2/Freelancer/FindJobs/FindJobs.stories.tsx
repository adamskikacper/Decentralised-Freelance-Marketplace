import type { Meta, StoryObj } from "@storybook/react";
import FindJobs from "./index";
import { BrowserRouter } from "react-router-dom";

/**
 * FindJobs is a component that allows freelancer users to find new jobs.
 * It provides search and filtering functionality for job opportunities.
 */
const meta = {
 title: "Dashboardv2/Freelancer/FindJobs",
 component: FindJobs,
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
  onJobDetails: { action: "jobDetails" },
 },
 tags: ["autodocs"],
} satisfies Meta<typeof FindJobs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default FindJobs view with job listings
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
