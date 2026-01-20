import { prisma } from '@/lib/prisma';
import { getCurrentUser } from "../auth";

export async function deleteProduct(formdata:FormData) {
   const user= await getCurrentUser()
   const userId=user.id
    const id=String(formdata.get("id")||"")
   await prisma.product.deleteMany({where:{
    id:id,userId:userId
   }})
    
}