// src/App.js
import React, { useState } from 'react';

// Import UI components we created in step 7
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

// Import icons we'll use from lucide-react
import { PlusCircle, Camera, Link2 } from 'lucide-react';

function App() {
  // State to manage our rooms and their ideas
  const [rooms, setRooms] = useState([
    { id: 'living-room', name: 'Living Room', ideas: [] },
    { id: 'kitchen', name: 'Kitchen', ideas: [] },
    { id: 'master-bedroom', name: 'Master Bedroom', ideas: [] }
  ]);

  const [newIdea, setNewIdea] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('living-room');

  // Function to add a new idea to a room
  const addIdea = (roomId) => {
    if (!newIdea.trim()) return;
    
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          ideas: [...room.ideas, {
            id: Date.now(),
            content: newIdea,
            type: 'text'
          }]
        };
      }
      return room;
    }));
    setNewIdea('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Tabs defaultValue="plans" className="w-full">
        {/* Tab navigation */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Building Plans</TabsTrigger>
          <TabsTrigger value="ideas">Idea Board</TabsTrigger>
        </TabsList>

        {/* Building Plans Tab */}
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Building Plans</CardTitle>
              <CardDescription>View and manage your home building plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">Drag and drop or click to upload building plans</p>
                <Button className="mt-4">Upload Plans</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Idea Board Tab */}
        <TabsContent value="ideas">
          <Card>
            <CardHeader>
              <CardTitle>Room Ideas</CardTitle>
              <CardDescription>Collect and organize ideas for each room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Render each room card */}
                {rooms.map(room => (
                  <Card key={room.id} className={`${selectedRoom === room.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Display existing ideas */}
                        {room.ideas.map(idea => (
                          <div key={idea.id} className="p-3 bg-gray-50 rounded-lg">
                            {idea.content}
                          </div>
                        ))}
                        
                        {/* Add new idea input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an idea..."
                            value={selectedRoom === room.id ? newIdea : ''}
                            onChange={(e) => {
                              setSelectedRoom(room.id);
                              setNewIdea(e.target.value);
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addIdea(room.id);
                              }
                            }}
                          />
                          <Button 
                            size="icon"
                            onClick={() => addIdea(room.id)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Add Image
                          </Button>
                          <Button variant="outline" size="sm">
                            <Link2 className="h-4 w-4 mr-2" />
                            Add Link
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
