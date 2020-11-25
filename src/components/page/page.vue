<template>
    <div class="page">
        <div class="firstPage" @click="toFirstPage"></div>
        <div class="prevPage" @click="toPrevPage"></div>
        <div class="pageInfo">
            <span>共{{totalRecords}}条记录</span>
            <el-input class="pageInput pageInput2" style="width:60px;" v-model="current_page" @change="pageChange"></el-input>
            <span>/ {{totalPage}}</span>
        </div>
        <div class="nextPage" @click="toNextPage"></div>
        <div class="lastPage" @click="toLastPage"></div>
    </div>
</template>

<script>
	export default {
		name: "page",
		props: ['totalPage', 'totalRecords', 'currentPage','totalRecordsTwo'],
		data() {
			return {
				current_page: this.currentPage
			}
		},
		watch: {
            // currentPage(newValue) {
            //     this.current_page = newValue;
            // },
            current_page:{
                handler(newValue,oldValue){
                    this.current_page = newValue;
                },
                deep:true,
                immediate:true
            }
        },
		methods: {
			pageChange(value) {
				if (!/^\d$/.test(value)) {
					this.current_page = 1;
				}
				if (value > this.totalPage) {
					this.current_page = 1;
				}
				this.$emit('pageChange', this.current_page)
			},
			toFirstPage() {
				if (this.current_page === 1) {
				} else {
					this.current_page = 1;
					this.$emit('pageChange', 1)
				}
			},
			toLastPage() {
				this.current_page = this.totalPage;
				this.$emit('pageChange', this.totalPage)
			},
			toPrevPage() {
				this.current_page = this.current_page - 1 <= 0 ? 1 : this.current_page - 1;
				this.$emit('pageChange', this.current_page)
			},
			toNextPage() {
				if (this.totalPage === parseInt(this.current_page)) {
				} else {
					this.current_page = this.current_page + 1 > this.totalPage ? this.totalPage : this.current_page + 1;
					this.$emit('pageChange', this.current_page)
				}
			}
		}
	}
</script>

<style lang="scss">
    .page {
        height: 25px;
        justify-content: flex-end;
        display: flex;
        flex-direction: row;
        color: #333;
        padding: 10px;

        .firstPage {
            width: 30px;
            height: 25px;
            line-height: 25px;
            background-image: url("../../assets/page/firstPage.png");
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
        }

        .prevPage {
            width: 30px;
            height: 25px;
            line-height: 25px;
            background-image: url("../../assets/page/prevPage.png");
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
        }

        .nextPage {
            width: 30px;
            height: 25px;
            line-height: 25px;
            background-image: url("../../assets/page/nextPage.png");
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
        }

        .lastPage {
            width: 30px;
            height: 25px;
            line-height: 25px;
            background-image: url("../../assets/page/lastPage.png");
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
        }

        .pageInfo {
            display: flex;
            justify-content: space-between;
            height: 25px;
            line-height: 25px;
            font-size: 12px;

        }
    }

    .pageInput {
        height: 25px;
        line-height: 25px;
        width: 60px;
        margin-left:10px;
        input {
            height: 25px !important;
            line-height: 25px !important;
            width: 40px;
            padding-left: 0;
            padding-right: 0;
            text-align: center;
        }
    }
    ::v-deep .el-input__inner{
        height: 25px;
        line-height: 25px;
        
    }
    .pageInput2{
        .el-input__inner{
            background-color: #008AFF;
            color:#fff;
        }
    }
</style>