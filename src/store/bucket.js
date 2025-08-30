import { defineStore } from 'pinia';
import bucketService from '../services/bucket';
import wishService from '../services/wish';

export const useBucketStore = defineStore('bucket', {
  state: () => ({
    buckets: [],
    currentBucket: null,
    wishes: []
  }),

  actions: {
    async fetchBuckets() {
      try {
        this.buckets = await bucketService.getUserBuckets();
        return this.buckets;
      } catch (error) {
        throw error;
      }
    },

    async createBucket(bucketData) {
      try {
        console.log("bucketData", bucketData);
        const newBucket = await bucketService.createBucket(bucketData);
        this.buckets.push(newBucket);
        return newBucket;
      } catch (error) {
        throw error;
      }
    },

    async selectBucket(bucketId) {
      try {
        this.currentBucket = await bucketService.getBucketById(bucketId);
        this.wishes = await wishService.getWishesByBucket(bucketId);
        return this.currentBucket;
      } catch (error) {
        throw error;
      }
    },

    async updateBucket(bucketId, updateData) {
      try {
        const updatedBucket = await bucketService.updateBucket(bucketId, updateData);
        const index = this.buckets.findIndex(b => b.id === bucketId);
        if (index !== -1) {
          this.buckets[index] = updatedBucket;
        }
        if (this.currentBucket?.id === bucketId) {
          this.currentBucket = updatedBucket;
        }
        return updatedBucket;
      } catch (error) {
        throw error;
      }
    },

    async deleteBucket(bucketId) {
      try {
        await bucketService.deleteBucket(bucketId);
        this.buckets = this.buckets.filter(b => b.id !== bucketId);
        if (this.currentBucket?.id === bucketId) {
          this.currentBucket = null;
          this.wishes = [];
        }
      } catch (error) {
        throw error;
      }
    },

    async createWish(wishData) {
      try {
        const newWish = await wishService.createWish(this.currentBucket.id, wishData);

          this.wishes.push(newWish);
          this.currentBucket.wishes.push(newWish);
        
        return newWish;
      } catch (error) {
        throw error;
      }
    },

    async updateWish(currentWish) {
      try {
        const updatedWish = await wishService.updateWish(currentWish.bucketId,currentWish.id, currentWish);
        const index = this.wishes.findIndex(w => w.id === currentWish.id);
        if (index !== -1) {
          this.wishes[index] = updatedWish;
        }
        return updatedWish;
      } catch (error) {
        throw error;
      }
    },

    async markWishComplete(bucketId, wishId) {
      try {
        const wish = await wishService.markComplete(bucketId,wishId);
        const index = this.wishes.findIndex(w => w.id === wishId);
        if (index !== -1) {
          this.wishes[index] = wish;
        }
        return wish;
      } catch (error) {
        throw error;
      }
    },

    async deleteWish(bucketId, wishId) {
      try {
    
        await wishService.deleteWish(bucketId, wishId);
        if(this.currentBucket?.id === bucketId){
          this.wishes = this.wishes.filter(w => w.id !== wishId);
          this.currentBucket.wishes = this.currentBucket.wishes.filter(w => w.id !== wishId);
        }
        
        
      } catch (error) {
        throw error;
      }
    }
  },

  getters: {
    getBuckets: (state) => state.buckets,
    getCurrentBucket: (state) => state.currentBucket,
    getWishes: (state) => state.wishes
  }
});
