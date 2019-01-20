<template>
  <f7-page>
        <f7-navbar title="Login" back-link="Back"></f7-navbar>

        <f7-navbar title="Form" back-link="Back"></f7-navbar>
        <f7-block-title>工作详细描述页面</f7-block-title>
        <f7-list form>
            <f7-list-item>
                <f7-label>工作内容描述(500字)</f7-label>
                <f7-input type="textarea" placeholder="工作内容描述"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>文字地址(200字)</f7-label>
                <f7-input type="textarea" placeholder="文字地址 "></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>详细地址(200字)</f7-label>
                <f7-input type="textarea" placeholder="详细地址"></f7-input>
            </f7-list-item> 
        </f7-list>
   
             <f7-row tag="p">
                <f7-button class="col" round fill>提交</f7-button>
            </f7-row>
    
      
  </f7-page>
</template>

<script>
export default {}
</script>
