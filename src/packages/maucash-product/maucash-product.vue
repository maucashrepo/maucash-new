<template>
  <div class="product" :style="{background: currentProduct=='Spektra' ? '#F0543C' : '#3273dc'}">
    <img
      v-if="currentProduct == 'Maucash'"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA/9JREFUaAXtmG1ojlEYxz22YZMx74UsKyRLixSSSClDSzSl5vXDUoSUlRLKB2o+4KOXDxMhy2p5W8QXiSIlkZQV0T7MS9u87/H7r11Px2PPdr89eOq56td5ua9zznXOuc51n/vu1y8r2RXIrkBGr0DsX1ofj8cLGH8JLIPPsD0Wi/0gTSm0GcxD6Yv7KRXT9QADCmEt1EMHuLKwp3FRyIdVcAHaweRiT/qR1zFaEayHRvgKqaTcBkdhEFTAOWgDk3dkjsIcSJ8H0flw2AhX4Rt4kdUoLYc6+OQ0eE/+JCyGHJtk5Cmdj4DNcB2+g1/54TTQqmv1V8AAGasUNMHTsD+SCdBRWKPpIiFyrwZYAzqsMjoHtPInoBVM7gWeAD1EabRW/QbI3YZ1Gx0jPxeOgXzeRG4l91oKeb4mQAP59Ca4BkHcg2YJ6SR3B7bAKDOEfBkcgmYw+UzmEigK5Zuup5QGih52EMMaTVfxe7ADxpkB5KfCPngGJhpLh78KCh3dPMq9Rx4UhoFC3hXwGj1QTSkPeLILih1DiinvhkdgYrtSTcVIR3co5Q2gwCB3O27Pfkt5MBnOgA5SFKLJz7RByI+FbXAXXNEEd4K7KwWUK+EyfAHJT7gF863PREqlQpX7sqAYWjSgfFwrehNUNnlCZg+UmBHkFSJlx1kwW7TiTSA3TpwVa9OV8qAE3NczxbTIS3o9CKVmAHk3ROplZaJd2gpjTDdlipJWIl3ymo6PwGwzgLxC5DxIDpGPqauBYtP1lNLgFEQtDXS4APqbEeTL4DC4IfIF5QMwzfR8pzRWuFIEiFLGyxA6tBD53Olcu1ILs1xjKc+A6W6dl3wuSj+h99jqpaffdZ5ijO71Rd3VX0mboQU+wCQoR2csqdyrEiZDNTwBz6IJ+Hu7eet6SJLaQMoTu7FHFZZx0k4n7ykrH034qacW6VOK0/Vbv93/D8bLheugjM/JRr8TkAtp5v9SLmF4VVADtAO+/S7oYCnafUtR76n6f5hAqAgoF6qBWtC3pibkojqxElZDOkTjBZZc/O9hX62J1/r6SdcEwu0Axl3AOP1c0otHESEZDVAM6ZJwE8CqN9AMchW5lJvqb4DKrT08k27mCjs3GG5DWDkfZhVyGV03wRGQ7Dp9lXXPsbtOGBtCu9BeRtdlKiNFftwEH7utl7+7Z8A9E24+Wceejaa9bpiZKbijPhFf+TwUioKBRWdgEa11F9eVQveiMOkU2k+Avyba+ipY99dG/HOgUJfJUK/xP20JVJPxE1C4DizagY7AraNpqO/k4MIhLoUWn5EjCnX9dauHvn9e9TK9rrcgnSiu6y9wT29Fr3Uaxquu9Nq5CbepUVayK5BdgeAr8AueJk4W6MgMaQAAAABJRU5ErkJggg=="
    >
    <img
      v-if="currentProduct=='Spektra'"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMA/AQI9fGdlun5tdDu4hvHcolcPjIRDNRhJo8Y2cuiUTcgwXdXLbxqSg65sKh7ZkUVhKV+bt1NKqtA8DXIAAAHtElEQVR42tWa53bbMAyFoWlJ3ns7HvFe8Wqi93+xtmlakgBBy62sc/r9tOKQJoGLC9jw/9FqvFZOufN55PdmnWMJMqV7OBdjFW96GUM2NKrFWE9h1+nDk2ldB7GJ8PzUc+hXC/Fdyq82PAfn4saJKNbgGdSKcWLKc0ib+TB+hHAG6TIL+cXcQnAb5NuBpbwarSE9JlPmsqPeoS4y7617vPr531ttp5eS37yY4p07evmzx7Pp52EM3iAdKha94o8Xx5ivlXYcx1tIA9unincqJTi2yC2nkvwbcvZ7BzKDrm/lTDf7/PUHY8gSO0Ifv+pApuTU9YM6ZMsBCXwJsqWu5n/Ohmx5C5T199yf1Q+90XY6XUT+pdNIc5NbJfw6Wn/0mkMGyZ1e0qrEHWX9F53WfegNym2fhlSUPHn9msYc3gxuYNSFf2UXSxyIQCwDtGbaglk3xl/9Ft/FO/yTBOZjwRk/PFlxEqL+PxhQWX8cZI/KxmXNyjlJuCkpuQpI/169B6wpTt5VbCXSs9dY8E19VI2TQ8On8uOlXYIdSBHQw+XpQVR73v0ZPaNHUuDmKOF3jh9mCTKf/s6HO4zE24/K+tv4cay6EoThZ10DI02hsDsiTpRwuDsdlpW9n7f0uaBEcQ8pm9kGeOi9FHdbWwsDt9qFOj1QDLv7+bYGGFjEv7miCMaEvSY+vZkmS2s0jQYtww38OckhSk3MaKLzB75FLkFebU4ul1fBlfw+l/zbFeg5Foxq0I4/eQGOs+4AWmQys+BFddLGhUnulC9fBp/Vo6JOA0d4/Z4xj9oGMeii1zCT+Is8skdU4HhKaJrS1uhssGatGLmkLgoA7JAoc5SPDY2cn0BLT7PpBZdXPJdY4aTRmcA2qsBSkxfkEY8twgDf5xgFGSL4kjhxQ82ATyqeF/XSpKLm/BaKrdbqfz302RLsazK/tz1XSugIiigIqN0Jdcb1/euhaMMb6vpDh1TvX2FtndcoCriw+RBum3Ikdxah2saPkG5Cm8jGqzpX4/NCfCUhQ6s7vaCFcgchKom0rA6Asvz1qMQcQBUQvvJY2Z5wz0jXT39ebQJh9vlgyhxA3ibr8/vbcRuY0XInuKAb2Cj1f05US2WUaANXYjjI7koiKWQuQF02fwJnbgMdJJD0f5b1H3HgIK0h1mPFDhiGJM4Yd3pQap2jeIsjKIxRicImXulgpyDYU9Mr+Pbz9Tk9LNqk9pFC4x02iX7S7moDAkk+itpMCieq1NIRfgVJGnkmgoOvBo4bxz1kIMV90WTm/8Bno2NIs0Y5H7erW8Tto8+H2ZL2RkY+voLR2NmdsTCwJMP4ACg7phQtyO9Fec3TlY2tWjojkgCotLaKrEJ9462NQWdOKFkRha55zLzSjxjGYKQsLdBEMzyVsI49AtqfXEOmyCex9C1kw/gL6OBcGvAuqmkhp8jySlob+oAv0myZrrGJa7AaORRfKhubuhq+Qf/g7T0/KZqbavCgiX0l7mPeiT4I582ztkSOK8mJmh53jgOgHRt89FW8/gFGVsxRbWmbZA4At0S6c6ZD58Q+cKgG84FUM6bICucmz1Qf5EPU94rNoUZWX8XL6GYotGRYE7bjit13UwDQadAqTiyDJX0Sof+/vBcA3js3hd9A0his8RoUseKl74Ar9w+AmvewibUBzxEFJTyfurDfA0WJvzWN+BToMMMFznRGtF3m2aBV6AL0FivEpLCPPxJ/Z2G9cQ1v2L0zGCr2VRsfossz42o6Xt84qbORRHiqRr8V0eWZcTSJ1lJ8SIBr0B6VoBVr4/kIpM7R6nNGbHnnAiq8QBT6wIK70jKnwm0bf9NnrBFX+dkr3KdB60AXt2FUNwQLdX9HizdQ5g2s0B1zTdXENZmUrse/1bwBq6VXQatLZEPGUx835UY5L/5lghgYMjewM5oA6xufAMEEErEm1zWLeSFd419b8Akwh4R4uJhtUB7zPnXHh6dnLgGk8FtrcY4u8fnivixllOawQ2NvDImJUOsyljWAFEE+ABvSxt36oz9i8vVJeKXeRfDCfndSGMMDVNBKkfRBmui2+BLlSOoZzOER5uiui6TZ106yyjYwfdhtAo9RVGa5LVaFnaKcZSVukJRPUIBI9gbaGCzYfJl54SzqYg0JwOlT1p7ziD+AEZcAIxsephXK/+9CnTY1CcU1Y4FOkBAUQBXdsMB1uK+GrLryZPHn9QP8Fd3hRDd7X7CdSFUfgO4KUmDB9Bpl5JGoOgUNSIM8rgPUqNe1PdJgAuluIHSYSutrDUq5Cekw1P6swvGQS8ffSWxakBJTlOrECHV0U4oPERapBeFM7wSnugvwIT0indiuLTGJ03iQ3FN+4/yORYCu5dxEYU4B1FrLtzrSD/P36X1+OuT3QCLQBkarIII1BVBXUNT93iVwiAuObEgX2xITdhICV3IA+RakzZSmW1UcANKgwgRSZ087y612EhCJXE0BUnYiWh+8Fj6qHDyDgLiBgrbdP26X8BR8MjEJxSg5C8bkZx/iUrKhjITIpsUhfaj9W6NRomdDFggDPEfd2giyo4JGbOUMboD+Qu6iluiwBRlSV8fcHZSWHOlqwU2y3pZQoYxoBkoabERIZMWL8mOMhmW9QcbUdo68n9Rk/zv+NU8/J/+erwAAAABJRU5ErkJggg=="
    >
    <img
      v-if="currentProduct == 'FIF_Insight'"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA/9JREFUaAXtmG1ojlEYxz22YZMx74UsKyRLixSSSClDSzSl5vXDUoSUlRLKB2o+4KOXDxMhy2p5W8QXiSIlkZQV0T7MS9u87/H7r11Px2PPdr89eOq56td5ua9zznXOuc51n/vu1y8r2RXIrkBGr0DsX1ofj8cLGH8JLIPPsD0Wi/0gTSm0GcxD6Yv7KRXT9QADCmEt1EMHuLKwp3FRyIdVcAHaweRiT/qR1zFaEayHRvgKqaTcBkdhEFTAOWgDk3dkjsIcSJ8H0flw2AhX4Rt4kdUoLYc6+OQ0eE/+JCyGHJtk5Cmdj4DNcB2+g1/54TTQqmv1V8AAGasUNMHTsD+SCdBRWKPpIiFyrwZYAzqsMjoHtPInoBVM7gWeAD1EabRW/QbI3YZ1Gx0jPxeOgXzeRG4l91oKeb4mQAP59Ca4BkHcg2YJ6SR3B7bAKDOEfBkcgmYw+UzmEigK5Zuup5QGih52EMMaTVfxe7ADxpkB5KfCPngGJhpLh78KCh3dPMq9Rx4UhoFC3hXwGj1QTSkPeLILih1DiinvhkdgYrtSTcVIR3co5Q2gwCB3O27Pfkt5MBnOgA5SFKLJz7RByI+FbXAXXNEEd4K7KwWUK+EyfAHJT7gF863PREqlQpX7sqAYWjSgfFwrehNUNnlCZg+UmBHkFSJlx1kwW7TiTSA3TpwVa9OV8qAE3NczxbTIS3o9CKVmAHk3ROplZaJd2gpjTDdlipJWIl3ymo6PwGwzgLxC5DxIDpGPqauBYtP1lNLgFEQtDXS4APqbEeTL4DC4IfIF5QMwzfR8pzRWuFIEiFLGyxA6tBD53Olcu1ILs1xjKc+A6W6dl3wuSj+h99jqpaffdZ5ijO71Rd3VX0mboQU+wCQoR2csqdyrEiZDNTwBz6IJ+Hu7eet6SJLaQMoTu7FHFZZx0k4n7ykrH034qacW6VOK0/Vbv93/D8bLheugjM/JRr8TkAtp5v9SLmF4VVADtAO+/S7oYCnafUtR76n6f5hAqAgoF6qBWtC3pibkojqxElZDOkTjBZZc/O9hX62J1/r6SdcEwu0Axl3AOP1c0otHESEZDVAM6ZJwE8CqN9AMchW5lJvqb4DKrT08k27mCjs3GG5DWDkfZhVyGV03wRGQ7Dp9lXXPsbtOGBtCu9BeRtdlKiNFftwEH7utl7+7Z8A9E24+Wceejaa9bpiZKbijPhFf+TwUioKBRWdgEa11F9eVQveiMOkU2k+Avyba+ipY99dG/HOgUJfJUK/xP20JVJPxE1C4DizagY7AraNpqO/k4MIhLoUWn5EjCnX9dauHvn9e9TK9rrcgnSiu6y9wT29Fr3Uaxquu9Nq5CbepUVayK5BdgeAr8AueJk4W6MgMaQAAAABJRU5ErkJggg=="
    >
    <template v-if="productList.length > 1">
      <Dropdown @on-click="changeVal" class="dropdown">
        <a href="javascript:void(0)" style="color:#fff; font-size:18px;">
          {{currentProduct}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="item in productList"
            :key="item.value"
            :name="JSON.stringify(item)"
          >{{item.name}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </template>
    <template v-else>
      <strong class="product-name">{{productList[0].name}}</strong>
    </template>
  </div>
</template>

<script>
export default {
  name: "maucashProduct",
  props: {
    productList: {
      type: Array,
      default: function() {
        return new Array();
      }
    }
  },
  data() {
    return {
      currentProduct: ""
    };
  },
  mounted() {
    const localStorageProduct = window.localStorage.getItem(
      "X-Operated-Product"
    );
    if (
      localStorageProduct &&
      this.productList.find(item => Object.is(item.value, localStorageProduct))
    ) {
      this.currentProduct = this.productList.find(item =>
        Object.is(item.value, localStorageProduct)
      ).name;
    } else {
      this.currentProduct = this.productList[0].name;
      window.localStorage.setItem(
        "X-Operated-Product",
        this.productList[0].value,
        { expire: 0.5, prefix: "sea" }
      );
    }
  },
  methods: {
    changeVal(val) {
      const { name, value } = JSON.parse(val);
      window.localStorage.setItem("X-Operated-Product", value, {
        expire: 0.5,
        prefix: "sea"
      });
      this.$emit("on-change", val);
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: row;
  height: 48px;
  background: #3273dc;
}
.product .dropdown {
  line-height: 48px;
}
.product img {
  width: 32px;
  height: 32px;
  margin-top: 6px;
  margin-left: 8px;
}
.product .select-product {
  margin-top: 8px;
}
.product .product-name {
  line-height: 48px;
  font-size: 18px;
  color: #fff;
}
</style>
