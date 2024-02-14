import React from 'react'
import { getSelf } from './auth-service'
import { db } from './db'

export const isBlockedByUser = async(id:string) => {
 
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where:{
                id,
            }
        })
        
        if(!otherUser){
            throw new Error("User not found")
        }
    
        if(otherUser.id === self.id){
            return true
        }

        const existingBlock = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId:otherUser.id,
                    blockedId:self.id,
                }
            }
        })

        return !!existingBlock

    } catch (error) {
        return false
    }
}

export const blockUser = async(id:string) => {
        const self = await getSelf();

        if(self.id === id){
            throw new Error('Cannot block yourself')
        };

        const otherUser = await db.user.findUnique({
            where:{
                id,
            }
        });
        
        if(!otherUser){
            throw new Error("User not found")
        };

        const existingBlock = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockedId:self.id,
                    blockerId:otherUser.id,
                }
            }
        })

        if(existingBlock){
            throw new Error('Already blocked')
        }

        const block = await db.block.create({
            data:{
                blockerId:self.id,
                blockedId:otherUser.id,
            },
            include:{
                blocked:true,
            }
        })

        return block

    } 
export const unBlockUser = async(id:string) => {
 
        const self = await getSelf();

        if(self.id === id){
            throw new Error('Cannot unblock yourself')
        };

        const otherUser = await db.user.findUnique({
            where:{
                id,
            }
        });
        
        if(!otherUser){
            throw new Error("User not found")
        };

        const existingBlock = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId:self.id,
                    blockedId:otherUser.id,
                }
            }
        })

        if(!existingBlock){
            throw new Error('User Is not blocked')
        }

        const unBlock = await db.block.delete({
            where:{
               id:existingBlock.id,
            },
            include:{
                blocked:true,
            }
        })

        return unBlock

}
