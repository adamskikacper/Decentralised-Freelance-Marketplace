import type { Meta, StoryObj } from "@storybook/react";
import DashboardLayout from "./index";
import { BrowserRouter } from "react-router-dom";
const meta = {
 title: "Dashboardv2/Layout/DashboardLayout",
 component: DashboardLayout,
 parameters: {
  layout: "fullscreen",
 },
 decorators: [
  (Story) => (
   <BrowserRouter>
    <Story />
   </BrowserRouter>
  ),
 ],
 tags: ["autodocs"],
} satisfies Meta<typeof DashboardLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
 args: {
  showSidebar: true,
 },
 render: () => (
  <DashboardLayout>
   <div className="p-6 bg-secondary/20 rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
    <p>This is the main content area of the dashboard.</p>
   </div>
  </DashboardLayout>
 ),
};
export const WithoutSidebar: Story = {
 args: {
  showSidebar: false,
 },
 render: () => (
  <DashboardLayout showSidebar={false}>
   <div className="p-6 bg-secondary/20 rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Full Width Content</h1>
    <p>This is the main content area without the sidebar.</p>
   </div>
  </DashboardLayout>
 ),
};
