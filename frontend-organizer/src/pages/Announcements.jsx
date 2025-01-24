import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      title: "Hackathon Kickoff",
      date: "Jan 20, 2025",
      description: "The hackathon has officially started! Make sure to check your schedules and team allocations.",
    },
    {
      title: "Workshop on AI",
      date: "Jan 21, 2025",
      description: "Join the exclusive workshop on AI and ML by industry experts. Slots are limited!",
    },
    {
      title: "Submission Deadline",
      date: "Jan 22, 2025",
      description: "Reminder: Project submissions are due by 8 PM. Make sure to upload your final projects.",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.date && newAnnouncement.description) {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement({ title: "", date: "", description: "" });
      setIsModalOpen(false);
    } else {
      alert("Please fill out all fields.");
    }
  };
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
                   <Button 
                      variant="outline" 
                      className="hover:bg-gray-100 transition-colors"
                      onClick={() => navigate(`/`)}
                    >
                      Back to home
                    </Button>

          {/* Header Section */}
          <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
              <p className="text-gray-500 mt-1">Stay updated with the latest news and events</p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="hover:bg-gray-100 transition-colors"
            >
              <Megaphone className="h-5 w-5 mr-2" />
              Add Announcement
            </Button>
          </div>

          {/* Announcements List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-shadow border-2 border-transparent hover:border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-blue-500" />
                    {announcement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{announcement.date}</span>
                  </div>
                  <p className="text-gray-700">{announcement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Add Announcement Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg shadow-xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Add New Announcement
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <Input
              placeholder="Title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              className="focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <Input
              type="date"
              placeholder="Date"
              value={newAnnouncement.date}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
              className="focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <Textarea
              placeholder="Description"
              value={newAnnouncement.description}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
              className="focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          <DialogFooter className="border-t pt-4 px-4">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAnnouncement}
              className="hover:bg-blue-600 transition-colors"
            >
              Add Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;