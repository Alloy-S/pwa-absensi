import api from "@/lib/axios";
import { LatestApprovalUsers } from "@/models/dashboardUserModel";

export const fetchApprovalLatestUser =
  async (): Promise<LatestApprovalUsers> => {
    const response = await api.get<LatestApprovalUsers>(
      "/dashboard/user/approvals"
    );
    return response.data;
};
