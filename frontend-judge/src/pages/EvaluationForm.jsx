import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const EvaluationForm = () => {
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [evaluationCriteria, setEvaluationCriteria] = useState([
    { criteria: 'Innovation', implemented: 'No', marks: 0, notes: '' },
    { criteria: 'Technical Complexity', implemented: 'No', marks: 0, notes: '' },
    { criteria: 'Problem Solving', implemented: 'No', marks: 0, notes: '' },
    { criteria: 'Design', implemented: 'No', marks: 0, notes: '' },
    { criteria: 'Presentation', implemented: 'No', marks: 0, notes: '' }
  ]);
  const [overallNotes, setOverallNotes] = useState('');

  const handleImplementedChange = (index, value) => {
    const newCriteria = [...evaluationCriteria];
    newCriteria[index].implemented = value;
    setEvaluationCriteria(newCriteria);
  };

  const handleMarksChange = (index, value) => {
    const newCriteria = [...evaluationCriteria];
    newCriteria[index].marks = parseInt(value) || 0;
    setEvaluationCriteria(newCriteria);
  };

  const handleNotesChange = (index, value) => {
    const newCriteria = [...evaluationCriteria];
    newCriteria[index].notes = value;
    setEvaluationCriteria(newCriteria);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const evaluationData = {
      teamName,
      teamNumber,
      criteria: evaluationCriteria,
      overallNotes
    };
    // TODO: Implement submission logic to send to organizers
    console.log(evaluationData);
    alert('Evaluation submitted!');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Hackathon Project Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Team Name</Label>
              <Input 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                required
              />
            </div>
            <div>
              <Label>Team Number</Label>
              <Input 
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
                placeholder="Enter team number"
                required
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criteria</TableHead>
                <TableHead>Implemented</TableHead>
                <TableHead>Marks (0-10)</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluationCriteria.map((criterion, index) => (
                <TableRow key={criterion.criteria}>
                  <TableCell>{criterion.criteria}</TableCell>
                  <TableCell>
                    <Select 
                      value={criterion.implemented}
                      onValueChange={(value) => handleImplementedChange(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Partially">Partially</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min="0" 
                      max="10" 
                      value={criterion.marks}
                      onChange={(e) => handleMarksChange(index, e.target.value)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea 
                      value={criterion.notes}
                      onChange={(e) => handleNotesChange(index, e.target.value)}
                      placeholder="Additional notes"
                      className="w-full"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <Label>Overall Notes</Label>
            <Textarea 
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              placeholder="Enter overall evaluation notes"
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">Submit Evaluation</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EvaluationForm;