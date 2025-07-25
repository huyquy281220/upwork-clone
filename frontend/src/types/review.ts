export interface ReviewProps {
  id: string;
  rating: number;
  comment: string;
  contractId: string;
  reviewerId: string;
  revieweeId: string;

  createdAt: string;
  updatedAt: string;
}
