import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { User, MessageSquare, Send, ThumbsUp, Edit2, Trash2, Reply, MoreHorizontal, Flag, Save, X, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Type for comment data
type Comment = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole?: string;
  content: string;
  timestamp: Date;
  likes: number;
  hasLiked: boolean;
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
  replies?: Comment[];
  isEditing?: boolean;
  isPinned?: boolean;
  isSolution?: boolean;
  tags?: string[];
};

type ProjectCommentsProps = {
  projectId: number | string;
  canModerate?: boolean;
};

export default function ProjectComments({ projectId, canModerate = false }: ProjectCommentsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [commentFilter, setCommentFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock comments data - in a real app, this would come from an API
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Alex Johnson",
      userAvatar: "",
      userRole: "Project Lead",
      content: "I'm excited about this project! I've been working on a similar concept and would love to contribute to the AI algorithm development. Anyone interested in collaborating on the NLP components?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      likes: 5,
      hasLiked: false,
      isPinned: true,
      tags: ["question", "collaboration"],
      replies: [
        {
          id: "1-1",
          userId: "user2",
          userName: "Emma Chen",
          userAvatar: "",
          content: "I'd be interested in helping with the NLP components. I have experience with transformer models and sentiment analysis.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          likes: 2,
          hasLiked: true,
        }
      ]
    },
    {
      id: "2",
      userId: "user3",
      userName: "Michael Taylor",
      userAvatar: "",
      content: "Has anyone considered how we'll handle user data privacy in this project? I think we should establish some clear guidelines before proceeding further.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      likes: 3,
      hasLiked: false,
      tags: ["concern", "privacy"],
    },
    {
      id: "3",
      userId: "user4",
      userName: "Sarah Parker",
      userAvatar: "",
      userRole: "UI/UX Designer",
      content: "I've created some initial wireframes for the user dashboard. Would love to get feedback on the user flow and interface design.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      likes: 8,
      hasLiked: true,
      attachments: [
        {
          type: "image",
          url: "#", // Would be a real URL in production
          name: "dashboard-wireframes.jpg"
        }
      ],
      tags: ["design", "feedback"],
      isSolution: true,
    },
  ]);

  // Submit new comment
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        userId: user?.id.toString() || "currentUser",
        userName: user?.username || "Current User",
        userAvatar: "",
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        hasLiked: false,
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
      
      toast({
        title: "Comment posted",
        description: "Your comment has been successfully added to the discussion.",
      });
    }, 500);
  };

  // Like a comment
  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (isReply && parentId && comment.id === parentId) {
          // Handle likes for replies
          return {
            ...comment,
            replies: comment.replies?.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.hasLiked ? reply.likes - 1 : reply.likes + 1,
                  hasLiked: !reply.hasLiked
                };
              }
              return reply;
            })
          };
        } else if (!isReply && comment.id === commentId) {
          // Handle likes for top-level comments
          return {
            ...comment,
            likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1,
            hasLiked: !comment.hasLiked
          };
        }
        return comment;
      });
    });
  };

  // Toggle edit mode for a comment
  const toggleEditMode = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => {
              if (reply.id === commentId) {
                return { ...reply, isEditing: !reply.isEditing };
              }
              return reply;
            })
          };
        } else if (!isReply && comment.id === commentId) {
          return { ...comment, isEditing: !comment.isEditing };
        }
        return comment;
      });
    });
  };

  // Save edited comment
  const saveEditedComment = (commentId: string, newContent: string, isReply: boolean = false, parentId?: string) => {
    if (!newContent.trim()) return;
    
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  content: newContent,
                  isEditing: false
                };
              }
              return reply;
            })
          };
        } else if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            content: newContent,
            isEditing: false
          };
        }
        return comment;
      });
    });
    
    toast({
      title: "Comment updated",
      description: "Your changes have been saved.",
    });
  };

  // Delete a comment
  const deleteComment = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.filter(reply => reply.id !== commentId)
            };
          }
          return comment;
        });
      });
    } else {
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    }
    
    toast({
      title: "Comment deleted",
      description: "The comment has been removed from the discussion.",
    });
  };

  // Add a reply to a comment
  const addReply = (parentId: string, replyContent: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: Comment = {
      id: `${parentId}-${Date.now()}`,
      userId: user?.id.toString() || "currentUser",
      userName: user?.username || "Current User",
      userAvatar: "",
      content: replyContent.trim(),
      timestamp: new Date(),
      likes: 0,
      hasLiked: false,
    };
    
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      });
    });
  };

  // Pin/unpin a comment
  const togglePinComment = (commentId: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isPinned: !comment.isPinned
          };
        } else if (comment.isPinned && !comment.id === commentId) {
          // Unpin any other comment if this one is being pinned
          return {
            ...comment,
            isPinned: false
          };
        }
        return comment;
      });
    });
    
    toast({
      title: "Comment updated",
      description: "The comment has been pinned to the top of the discussion.",
    });
  };

  // Mark a comment as a solution
  const markAsSolution = (commentId: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isSolution: !comment.isSolution
          };
        }
        return comment;
      });
    });
    
    toast({
      title: "Solution marked",
      description: "This comment has been marked as a solution to the discussion.",
    });
  };

  // Report a comment
  const reportComment = () => {
    if (!selectedComment) return;
    
    setIsLoading(true);
    
    // Simulate API call for reporting
    setTimeout(() => {
      setIsLoading(false);
      setShowReportDialog(false);
      setReportReason("");
      setSelectedComment(null);
      
      toast({
        title: "Comment reported",
        description: "Thank you for your report. Our moderators will review it shortly.",
      });
    }, 1000);
  };

  // Filter comments by tag
  const filteredComments = comments.filter(comment => {
    if (commentFilter === "all") return true;
    if (commentFilter === "pinned") return comment.isPinned;
    if (commentFilter === "solutions") return comment.isSolution;
    return comment.tags?.includes(commentFilter);
  });

  // Sort comments to put pinned ones first
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  // Animation variants
  const commentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Project Discussion
          </h2>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {comments.length} comment{comments.length !== 1 ? 's' : ''}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {commentFilter === "all" ? "All Comments" : 
                   commentFilter === "pinned" ? "Pinned" : 
                   commentFilter === "solutions" ? "Solutions" : 
                   commentFilter.charAt(0).toUpperCase() + commentFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setCommentFilter("all")}>
                  All Comments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommentFilter("pinned")}>
                  Pinned
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommentFilter("solutions")}>
                  Solutions
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCommentFilter("question")}>
                  Questions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommentFilter("feedback")}>
                  Feedback
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommentFilter("collaboration")}>
                  Collaboration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommentFilter("concern")}>
                  Concerns
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* New comment form */}
        <div className="border rounded-lg p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {user?.username?.charAt(0) || <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your thoughts or questions about this project..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-24 resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-0">
                            Question
                          </Badge>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a question tag to your comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                            Feedback
                          </Badge>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a feedback tag to your comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0">
                            Collaboration
                          </Badge>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a collaboration tag to your comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments list */}
        <div className="space-y-5">
          <AnimatePresence>
            {sortedComments.length > 0 ? (
              sortedComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={handleLike}
                  onEdit={toggleEditMode}
                  onSaveEdit={saveEditedComment}
                  onDelete={deleteComment}
                  onAddReply={addReply}
                  onPin={canModerate ? togglePinComment : undefined}
                  onMarkSolution={canModerate ? markAsSolution : undefined}
                  onReport={(comment) => {
                    setSelectedComment(comment);
                    setShowReportDialog(true);
                  }}
                  currentUserId={user?.id.toString() || ""}
                  canModerate={canModerate}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 border rounded-lg"
              >
                <div className="text-muted-foreground">
                  {commentFilter === "all" 
                    ? "Be the first to start the discussion!" 
                    : "No comments found with the selected filter."}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Report Comment
            </DialogTitle>
            <DialogDescription>
              Please let us know why you're reporting this comment. Our team will review it as soon as possible.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="border p-3 rounded-md bg-muted/40">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-medium text-sm">{selectedComment?.userName}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedComment?.timestamp && format(selectedComment.timestamp, 'MMM d, yyyy')}
                </div>
              </div>
              <div className="text-sm">{selectedComment?.content}</div>
            </div>
            
            <Textarea
              placeholder="Please provide details about why you're reporting this comment..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-24"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={reportComment}
              disabled={!reportReason.trim() || isLoading}
              variant="destructive"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Comment Item Component
type CommentItemProps = {
  comment: Comment;
  onLike: (id: string, isReply?: boolean, parentId?: string) => void;
  onEdit: (id: string, isReply?: boolean, parentId?: string) => void;
  onSaveEdit: (id: string, content: string, isReply?: boolean, parentId?: string) => void;
  onDelete: (id: string, isReply?: boolean, parentId?: string) => void;
  onAddReply: (parentId: string, content: string) => void;
  onPin?: (id: string) => void;
  onMarkSolution?: (id: string) => void;
  onReport: (comment: Comment) => void;
  currentUserId: string;
  parentId?: string;
  isReply?: boolean;
  canModerate?: boolean;
};

function CommentItem({
  comment,
  onLike,
  onEdit,
  onSaveEdit,
  onDelete,
  onAddReply,
  onPin,
  onMarkSolution,
  onReport,
  currentUserId,
  parentId,
  isReply = false,
  canModerate = false
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  
  const isCurrentUserComment = comment.userId === currentUserId;
  
  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    
    setIsSubmittingReply(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
      setIsSubmittingReply(false);
    }, 500);
  };
  
  return (
    <motion.div
      variants={isReply ? {} : {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.3
          }
        },
        exit: { 
          opacity: 0,
          transition: {
            duration: 0.2
          }
        }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`border rounded-lg ${isReply ? "mt-3" : ""} ${comment.isPinned ? "border-primary/50 bg-primary/5" : ""}`}
    >
      <div className="p-4">
        {/* Comment header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={comment.userAvatar} />
              <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center">
                <span className="font-medium text-sm">{comment.userName}</span>
                {comment.userRole && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    {comment.userRole}
                  </Badge>
                )}
                {comment.isPinned && (
                  <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs">
                    Pinned
                  </Badge>
                )}
                {comment.isSolution && (
                  <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0 text-xs">
                    Solution
                  </Badge>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground">
                {format(comment.timestamp, 'MMM d, yyyy • h:mm a')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {(isCurrentUserComment || canModerate) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isCurrentUserComment && (
                    <>
                      <DropdownMenuItem onClick={() => onEdit(comment.id, isReply, parentId)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(comment.id, isReply, parentId)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {!isCurrentUserComment && (
                    <DropdownMenuItem onClick={() => onReport(comment)}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                  )}
                  
                  {canModerate && (
                    <>
                      {onPin && (
                        <DropdownMenuItem onClick={() => onPin(comment.id)}>
                          {comment.isPinned ? (
                            <>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Unpin Comment
                            </>
                          ) : (
                            <>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Pin Comment
                            </>
                          )}
                        </DropdownMenuItem>
                      )}
                      
                      {onMarkSolution && (
                        <DropdownMenuItem onClick={() => onMarkSolution(comment.id)}>
                          {comment.isSolution ? (
                            <>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Remove Solution Mark
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Solution
                            </>
                          )}
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {/* Comment tags */}
        {comment.tags && comment.tags.length > 0 && !isReply && (
          <div className="flex flex-wrap gap-2 mb-3">
            {comment.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="outline" 
                className={`
                  ${tag === 'question' ? 'border-blue-500 text-blue-500' : ''}
                  ${tag === 'feedback' ? 'border-green-500 text-green-500' : ''}
                  ${tag === 'collaboration' ? 'border-amber-500 text-amber-500' : ''}
                  ${tag === 'concern' ? 'border-red-500 text-red-500' : ''}
                  ${tag === 'design' ? 'border-violet-500 text-violet-500' : ''}
                  ${tag === 'privacy' ? 'border-orange-500 text-orange-500' : ''}
                `}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Comment content */}
        {comment.isEditing ? (
          <div className="mb-3">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-24 mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(comment.id, isReply, parentId)}
              >
                <X className="mr-1 h-3 w-3" />
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={() => onSaveEdit(comment.id, editedContent, isReply, parentId)}
              >
                <Save className="mr-1 h-3 w-3" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm mb-3 whitespace-pre-line">
            {comment.content}
          </div>
        )}
        
        {/* Attachments if any */}
        {comment.attachments && comment.attachments.length > 0 && (
          <div className="mb-3">
            {comment.attachments.map((attachment, index) => (
              <div key={index} className="inline-block mr-2 mb-2">
                {attachment.type === 'image' && (
                  <div className="border rounded-md p-1 bg-muted/50">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-primary/10 rounded-md flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-primary"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                      <span className="text-xs">{attachment.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Comment actions */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onLike(comment.id, isReply, parentId)}
            className={`flex items-center gap-1 h-7 ${comment.hasLiked ? 'text-primary' : ''}`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{comment.likes}</span>
          </Button>
          
          {!isReply && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 h-7"
            >
              <Reply className="h-3 w-3" />
              <span>Reply</span>
            </Button>
          )}
        </div>
        
        {/* Reply form */}
        {showReplyForm && (
          <div className="mt-3 border-t pt-3">
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-12 text-sm"
                />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim() || isSubmittingReply}
                  >
                    {isSubmittingReply ? (
                      <>
                        <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Replying...
                      </>
                    ) : (
                      <>
                        <Send className="mr-1 h-3 w-3" />
                        Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 border-t pt-3 pl-4 border-l">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onEdit={onEdit}
                onSaveEdit={onSaveEdit}
                onDelete={onDelete}
                onAddReply={onAddReply}
                onReport={onReport}
                currentUserId={currentUserId}
                parentId={comment.id}
                isReply={true}
                canModerate={canModerate}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}