var data = ['aaaa','bbbbbbbbbbbbb','ccc','ababa','cdcd','cccs'];

var Autocomplete = React.createClass({
    getInitialState:function(){
        return {
            ori_urls:this.props.data,
            urls:[],
            url:this.props.default || ''
        };
    },
    handleInput:function(e){
        console.log('input clicked!');
        this.state.url = e.target.value;
        this.state.urls = this.state.ori_urls.filter(function(item){
            if(item.includes(e.target.value)){
                    return true;
            }
            return false;
        });
        this.setState(this.state);
    },
    handleAClick:function(e){
        this.state.url = e.target.value;
        this.state.urls = [];
        this.setState(this.state);
    },
    componentDidMount:function(){
        document.addEventListener("mousedown",this.pageClick,false);
    },
    pageClick:function(e){
            var env = e.target;
            if(env === this._input || env===this._popup || env.parentNode === this._popup)
            {
                console.log('inside '+e.target);
                return;
            }
            console.log('outside '+e.target);
            this.state.urls = [];
            this.forceUpdate();
    },
    componentWillUnmount:function(){
        document.removeEventListener("mousedown",this.pageClick)
    },
    render:function(){
        var self = this;
        if(this.props.openPopup){
            this.state.urls = [];
            this.setState(this.state);
        }
        var popups = this.state.urls.map(function(url){
                return (
                    <div href="#" onClick={self.handleAClick} value={url} >{url}
                    </div>
                );
        });
        var autocompleteStyle={width:this.props.width};
        var inputStyle = {height:this.props.height};
        var popupStyle = {top:this.props.height};
        var className = 'autocomplete '+this.props.className;
        return (
            <div className={className} style={autocompleteStyle} >
            <input ref={(c)=>this._input=c} style={inputStyle} value={this.state.url} onClick={this.handleInput} onChange={this.handleInput} type="text" placeholder="please input here:" />
            <div ref={(c)=>this._popup=c} className="popup" style={popupStyle}>
            {popups}
        </div>
    </div>
        );
    }
});
ReactDOM.render(
    <Autocomplete data={data} width='600px' default='haha' height='30px' />,
    document.getElementById('react')
);